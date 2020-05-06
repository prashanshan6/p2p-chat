const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();
morgan("tiny");

let app = express();
app.set("view engine", "ejs");

const port = process.env.PORT || 5555;
app.use("/views", express.static(__dirname + "/views"));

const user = require("./routes/user");
app.use("/api/user/", user);

app.use("/api/user", express.static(__dirname + "/views"));

mongoose
    .connect(
        "mongodb+srv://prashan:drsfiends@cluster0-twrax.mongodb.net/p2pChat?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log('connected to "p2pChat" db');
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/chat", (req, res) => {
    res.render("chat.ejs", { status: true });
});
app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});
