global.socket = io("http://localhost:3000");

function init() {
    socket.emit("init", sessionStorage.getItem("x-user-token"));
}
init();
//

//init_peer obj is used to initiate connection to online friends during login
// simple peer obj is used to accept connections from friends who comes online
var Peer = require("simple-peer");

// display conversations when socket is initiated
var friends;
socket.on("friends-list", (friends_data) => {
    friends = friends_data;
    $(function () {
        if (friends == undefined || Object.keys(friends).length == 0) {
            console.log("You don't have any friends yet");
        } else {
            Object.keys(friends).forEach((email) => {
                let tempConvoDiv =
                    '<div id="' +
                    email.replace("@", "").replace(".", "") +
                    "ConvoDiv" +
                    '" class="conversation" onclick="makeConvoActive(\'' +
                    email.replace("@", "").replace(".", "") +
                    '\');"><img src="./img/chatApp/avatarM.png" alt=\'' +
                    friends[email] +
                    '\'/><div class="title-text">' +
                    friends[email] +
                    '</div><div class="created-date">00:00</div><div class="conversation-message">Start a Conversation</div><div><i class="fas  fa-circle"></i></div></div>';
                $("#conversation-list").append(tempConvoDiv);

                let tempChatTitle =
                    "<div id=" +
                    email.replace("@", "").replace(".", "") +
                    "ChatTitleDiv" +
                    ' class="chat-title"><span>' +
                    friends[email] +
                    "</span><i onclick=\"deleteConvo('" +
                    email +
                    '\');" class="fas fa-trash-alt"></i> </div>';
                $("#chat-container").append(tempChatTitle);

                let tempChatMessageList =
                    "<div id=" +
                    email.replace("@", "").replace(".", "") +
                    "ChatMsgsList" +
                    ' class="chat-message-list"></div>';
                $("#chat-container").append(tempChatMessageList);

                let tempChatForm =
                    "<div id=" +
                    email.replace("@", "").replace(".", "") +
                    "ChatForm" +
                    ' class="chat-form"><input type="text" placeholder="you cannot send messages when friend is offline" disabled /><div onclick="sendMessage(\'' +
                    email +
                    '\');"><i class="far fa-paper-plane fa-3x"></i></div></div>';
                $("#chat-container").append(tempChatForm);
            });
        }
    });
});

socket.on("friends-online", function (friends_online) {
    // to make sure the .conversation class loaded already
    // before changing online status of .conversation

    let signalObj = {};

    friends_online.forEach(function (email) {
        init_peers[email] = new Peer({
            initiator: true,
            trickle: false,
        });
        // when reciving a message from
        init_peers[email].on("data", (data) => {
            let message = data.toString();
            recievedMessage(email, message);
        });
        init_peers[email].on("signal", function (signalId) {
            signalObj[email] = signalId;
            socket.emit("connect-with-me", {
                email: email,
                signalId: signalId,
                initToken: sessionStorage.getItem("x-user-token"),
            });
        });
    });
});

socket.on("connect-with-me", function (obj) {
    let friendEmail = obj.friendEmail;
    let friendSignalId = obj.signalId;

    if (!simple_peers[friendEmail]) {
        simple_peers[friendEmail] = new Peer({
            initiator: false,
            trickle: false,
        });
        // when recieving a message from initiator
        simple_peers[friendEmail].on("data", (data) => {
            let message = data.toString();
            recievedMessage(friendEmail, message);
        });

        simple_peers[friendEmail].signal(friendSignalId);
        simple_peers[friendEmail].on("signal", (returnSignal) => {
            socket.emit("ok-i-accept-your-connection", {
                friendEmail: friendEmail,
                returnSignal: returnSignal,
                // recieverToken: sessionStorage.getItem("x-user-token"),
            });
        });
        makeOnline(friendEmail);
    }
});

socket.on("ok-i-accept-your-connection", function (obj) {
    let friendEmail = obj.friendEmail;
    let friendSignalId = obj.returnSignal;

    init_peers[friendEmail].signal(friendSignalId);
    makeOnline(friendEmail);
});

// when a single friend comes online
socket.on("hey-im-online", (friend_email) => {
    // from clickable.js
    makeOnline(friend_email);
});

// when a single friend goes offline
socket.on("bye-im-leaving", (friend_email) => {
    // from clickable.js
    makeOffline(friend_email);

    if (simple_peers[friend_email]) {
        simple_peers[friend_email].destroy();
        delete simple_peers[friend_email];
    }
    if (init_peers[friend_email]) {
        init_peers[friend_email].destroy();
        delete init_peers[friend_email];
    }
});
