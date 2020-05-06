const express = require("express");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const io = require("socket.io")(3000);
require("dotenv").config();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { userModel } = require("../models/user");
const { userAuth } = require("../middlewares/userAuth");
let global_users = {};

async function friendsList(email) {
    try {
        const user = await userModel.findOne({ email: email });
        let friends = user.friends;

        return friends;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function friendsOnline(friends_list, email) {
    try {
        let temp = [];
        if (friends_list == undefined) friends_list = {};
        Object.keys(friends_list).forEach((email) => {
            if (global_users[email]) {
                temp.push(email);
            }
        });
        return temp;
    } catch (err) {
        console.log(err);
        return null;
    }
}

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // when recieving a init message from client with email id
    let decoded;
    let email;
    let friends;

    socket.on("init", async (data) => {
        const token = data;
        decoded = jwt.verify(token, process.env.JWTToken);
        email = decoded.email;
        global_users[email] = socket;

        // get friends list
        friends = await friendsList(email);
        socket.emit("friends-list", friends);

        // get online friends
        let online_friends = await friendsOnline(friends, email);

        socket.emit("friends-online", online_friends);

        online_friends.forEach((friendsEmail) => {
            global_users[friendsEmail].emit("hey-im-online", email);
        });
    });
    socket.on("connect-with-me", (obj) => {
        const friendEmail = obj.email;
        const signal = obj.signalId;
        const token = obj.initToken;
        let initEmail = jwt.verify(token, process.env.JWTToken).email;
        try {
            global_users[friendEmail].emit("connect-with-me", {
                friendEmail: initEmail,
                signalId: signal,
            });
        } catch (error) {
            console.log(error);
        }
    });
    socket.on("ok-i-accept-your-connection", (obj) => {
        const friendEmail = obj.friendEmail;
        const signal = obj.returnSignal;
        try {
            global_users[friendEmail].emit("ok-i-accept-your-connection", {
                friendEmail: email,
                // socket's email
                returnSignal: signal,
            });
        } catch (error) {
            console.log(error);
        }
    });

    // populate conversation and display online status when friend request is accepted
    socket.on("accepted-friend", (data) => {
        let toMyself = {};
        toMyself[data.friendEmail] = data.name;

        let decoded = jwt.verify(data.token, process.env.JWTToken);
        let toFriend = {};
        toFriend[email] = decoded.name;

        socket.emit("friends-list", toMyself);
        if (data.friendEmail in global_users)
            global_users[data.friendEmail].emit("friends-list", toFriend);

        // displays online and initiates connection
        if (email in global_users)
            socket.emit("friends-online", Object.keys(toMyself));
    });

    socket.on("disconnect", async () => {
        delete global_users[email];
        console.log("one socket disconnected");

        let online_friends = await friendsOnline(friends, email);
        online_friends.forEach((friendsEmail) => {
            global_users[friendsEmail].emit("bye-im-leaving", email);
        });
    });
});

router.post("/login", async (req, res) => {
    let payload = req.body;
    try {
        let user = await userModel.findOne({
            email: payload.email,
        });
        if (!user)
            return res.status(400).json({ status: "email didn't match" });

        let result = bcryptjs.compareSync(payload.password, user.password);

        if (result) {
            let temp = {
                name: user.name,
                email: user.email,
            };
            const token = jwt.sign(temp, process.env.JWTToken);
            global_users[payload.email] = 1;
            return res.json({ token: token });
        } else return res.status(400).json({ status: "password didn't match" });
    } catch (err) {
        console.log({ error: err });
        return res.status(400).json({ error: err });
    }
});
router.post("/signup", async (req, res) => {
    const payload = req.body;
    try {
        let user = await userModel.findOne({
            email: payload.email,
        });
        if (payload.password.length < 8)
            return res.status(400).json({ status: "password too short" });

        if (user)
            return res.status(400).json({ status: "email registered already" });

        let salt = bcryptjs.genSaltSync(10);
        let hash = bcryptjs.hashSync(payload.password, salt);
        payload.password = hash;

        user = await new userModel(payload);
        let result = await user.save();
        if (result) return res.json({ status: "account created successfully" });
        else return res.status(400).json({ status: "failed try again" });
    } catch (err) {
        console.log({ error: err });
        return res.status(400).json({ error: err });
    }
});
router.get("/friends", userAuth, async (req, res) => {
    const email = req.user.email;
    if (!email) return res.status(403).json({ error: "not logged in" });
    try {
        const user = await userModel.findOne({ email: email });
        let friends = user.friends;
        return res.json(friends);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
});

router.get("/friend_requests", userAuth, async (req, res) => {
    const email = req.user.email;
    if (!email) return res.status(403).json({ error: "not logged in" });
    try {
        const user = await userModel.findOne({ email: email });
        let friend_requests = user.friend_requests;
        if (!friend_requests) friend_requests = {};
        return res.json(friend_requests);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
});
router.get("/add_friend/:otherGuyEmail", userAuth, async (req, res) => {
    const email = req.user.email;
    const name = req.user.name;
    if (!email) return res.status(403).json({ error: "not logged in" });
    const otherGuyEmail = req.params.otherGuyEmail;
    try {
        let otherGuy = await userModel.findOne({
            email: otherGuyEmail,
        });
        if (otherGuy) {
            if (!otherGuy.friend_requests) otherGuy.friend_requests = {};
            otherGuy.friend_requests[email] = name;
            otherGuy.markModified("friend_requests");
            let result = await otherGuy.save();

            if (result) return res.json({ status: "friend request is sent" });
            else return res.json({ error: "failed try again" });
        } else return res.status(400).json({ status: "user doesn't exist" });
    } catch (err) {
        console.log({ error: err });
        return res.status(400).json({ error: err });
    }
});
router.get("/accept/:otherGuyEmail", userAuth, async (req, res) => {
    const email = req.user.email;
    const name = req.user.name;
    if (!email) return res.status(403).json({ error: "not logged in" });
    const otherGuyEmail = req.params.otherGuyEmail;

    try {
        let otherGuy = await userModel.findOne({
            email: otherGuyEmail,
        });
        let user = await userModel.findOne({
            email: email,
        });

        if (otherGuy) {
            // chek if it is deleted

            delete user.friend_requests[otherGuyEmail];

            if (!otherGuy.friends) otherGuy.friends = {};
            otherGuy.friends[email] = user.name;

            if (!user.friends) user.friends = {};
            user.friends[otherGuyEmail] = otherGuy.name;

            user.markModified("friends");
            user.markModified("friend_requests");
            otherGuy.markModified("friends");

            let result1 = await otherGuy.save();
            let result2 = await user.save();
            return res.json({
                status: "friend request is accepted",
                data: { email: otherGuyEmail, name: otherGuy.name },
            });
        } else return res.status(400).json({ status: "user doesn't exist" });
    } catch (err) {
        console.log({ error: err });
        return res.status(400).json({ error: err });
    }
});
router.get("/reject/:otherGuyEmail", userAuth, async (req, res) => {
    const email = req.user.email;
    if (!email) return res.status(403).json({ error: "not logged in" });
    const otherGuyEmail = req.params.otherGuyEmail;
    try {
        let user = await userModel.findOne({
            email: email,
        });
        if (user) {
            delete user.friend_requests[otherGuyEmail];
            user.markModified("friend_requests");

            let result = await user.save();
            if (result)
                return res.json({ status: "friend request is rejected" });
            else return res.json({ error: "failed try again" });
        } else return res.status(400).json({ status: "user doesn't exist" });
    } catch (err) {
        console.log({ error: err });
        return res.status(400).json({ error: err });
    }
});
router.get("/chat_app", (req, res) => {
    res.render("chatApp.ejs", { status: true });
});

module.exports = router;
