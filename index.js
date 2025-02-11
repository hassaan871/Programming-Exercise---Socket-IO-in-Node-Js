const http = require('http');
const path = require('path');
const socket = require('socket.io');
const express = require("express");
const app = express();

const PORT = 5000;

const server = http.createServer(app);
const io = socket(server);

// let count=0;
io.on('connection', (socket)=>{
    // console.log("user connected: ", count++);
    console.log("a user connected...");

    // setTimeout(()=>{
        // socket.send('a string sent from the server side');
    // }, 3000);

    socket.emit('myCustomEvent',{description:"custom message from server side"});

    socket.on('myCustomMessageFromClientSide', (data)=>{
        console.log(data);
    });

    socket.on('disconnect',()=>{
        console.log("a user disconnected..."); 
        // console.log("user connected: ", count--);
    }); 

});

app.get('/', (req,res)=>{
    res.sendFile(path.resolve('index.html'));
});

server.listen(PORT, ()=>{
    console.log(`server running on PORT: ${PORT}`);
})