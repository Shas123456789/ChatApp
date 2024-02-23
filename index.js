const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// socket.io
io.on("connection", (socket) => {
    console.log("New user is connected", socket.id);

    socket.on("usermessage", (message) => {
        console.log("New message found", message);
        io.emit("recievemessage", message);
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "/public/index.html"));
});

server.listen(9035, () => console.log("Server started at port 9035"));
