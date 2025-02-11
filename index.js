const http = require('http');
const path = require('path');
const socket = require('socket.io');
const express = require("express");
const app = express();

const PORT = 5000;

const server = http.createServer(app);
const io = socket(server);

io.on('connection', (socket)=>{
    console.log("a user connected...");

    socket.on('disconnect',()=>{
        console.log("a user disconnected..."); 
    }); 
});

app.get('/', (req,res)=>{
    res.sendFile(path.resolve('index.html'));
});

server.listen(PORT, ()=>{
    console.log(`server running on PORT: ${PORT}`);
})