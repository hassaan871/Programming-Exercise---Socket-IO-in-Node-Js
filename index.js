const http = require('http');
const path = require('path');
const socket = require('socket.io');
const express = require("express");
const app = express();

const PORT = 5000;

const server = http.createServer(app);
const io = socket(server);

let count = 0;
io.on('connection', (socket) => {
    console.log("a user connected...");

    count++;
    io.sockets.emit('broadcast', {message: count+" users connected"});

    socket.on('disconnect', () => {
        console.log("a user disconnected...");
        count--;
        io.sockets.emit('broadcast',() => {message: count+" users connected"});
    });

});

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

server.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
})