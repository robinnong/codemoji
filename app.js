const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

// Namespace for the server
const io = socketIo(server);   

io.on("connection", (socket) => {
    console.log("New client connected - yay");  
    // Receives user messages and broadcasts them to all clients - later change this to broadcast only to rooms with ID
    socket.on('new message', (data) => { 
        socket.emit('receive message', data)
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
}); 

server.listen(port, () => console.log(`Listening on port ${port}`));
