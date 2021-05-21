const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("./src/config/config");
const messageController = require("./src/controllers/messageController");
// PORT
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

let users = {};

io.on("connection", (socket) => {
    // attaching incoming listener from new connected user
    socket.on("user_connected", (username) => {
        users[username] = socket.id;
        // notify all connected clients
        let users_list = Object.keys(users);
        io.emit("connected_user", users_list);
    });

    socket.on("send_message", (data) => {
        // receive message from user
        // save to db
        messageController.saveMessage(data);
        // send message to a other user
        let socketId = users[data.receiver];
        io.to(socketId).emit("new_message", data);
    });

    socket.on("disconnect", () => {
        users = remove_user(socket.id, users);
        let users_list = Object.keys(users);
        io.emit("connected_user", users_list);
    });
});

server.listen(PORT, () => {
    console.log("listening on PORT: " + PORT);
});

function remove_user(userid, users) {
    var new_keys = Object.keys(users).filter(
        (this_user) => users[this_user] !== userid
    );
    new_obj = {};
    new_keys.forEach((key) => (new_obj[key] = users[key]));
    return new_obj;
}
