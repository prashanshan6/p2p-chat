const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            maxlength: 255,
            required: true,
        },
        friend_requests: {
            type: mongoose.Schema.Types.Mixed,
        },
        friends: {
            type: mongoose.Schema.Types.Mixed,
        },
    },
    { minimize: false }
);

const userModel = new mongoose.model("users", userSchema);

module.exports.userModel = userModel;
