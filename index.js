const express = require("express");
const app = express();

const ConnectionEvents = {
    CHAT_MESSAGE : "chat_message",

}

const http = require("http");
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    socket.on(ConnectionEvents.CHAT_MESSAGE, (msg) => {
        console.log(msg);
        io.emit(ConnectionEvents.CHAT_MESSAGE, msg);
    })
})


server.listen(PORT, () => {
    console.log(`Server is listening through port ${PORT}`)
})