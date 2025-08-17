// Node js server will act as my SFU and relay the webrtc packets to other client
import cors from "cors";
import express from "express";
import http from "http";
import {Server} from "socket.io";
import serverConfig from "./config/serverConfig.js";
import roomHandler from "./handlers/roomHandler.js";
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("New user connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
server.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}`);
});
