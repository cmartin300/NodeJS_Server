const { log } = require('console');
const express = require('express');
const { createServer } = require('http');
const { type } = require('os');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// app.route("/").get((req, res) => {
//     res.json("My little server")
// })

io.on("connection", (socket) => {
    socket.join("chat_group")
    console.log("User connected!");
    socket.on('sendMessage', (data) => {
        console.log("Data received: ", data);
        // socket.emit("serverMessage", {...data, type:"serverMessage"});
        io.to("chat_group").emit("serverMessage", {...data, type:"serverMessage"});
    })
    socket.on("meetingAlert", (data) => {
        console.log("Meeting Type: ", data);
        io.to("chat_group").emit("Alert", {data});
    })
});

httpServer.listen(3000);