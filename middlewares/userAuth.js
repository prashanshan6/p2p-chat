const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
    const token = req.header("x-user-token");
    console.log("token : ", token);

    if (!token)
        return res.status(401).send("access denied, token not provided");
    try {
        const user = jwt.verify(token, process.env.JWTToken);
        console.log(user);

        if (!user)
            return res.status(400).json({ error: "invalid/expired token" });
        req.user = user;

        next();
    } catch (error) {
        res.status(400).send("invalid token");
    }
}
module.exports.userAuth = userAuth;
