import express from "express";
import http from "http";
import {Server} from "socket.io";
import serverConfig from "./config/serverConfig.js";
import cors from "cors";
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods:["GET","POST"]
    }
});
io.on("connection",(socket)=>{
    console.log("New user connected");
    socket.on("disconnect",()=>{
        console.log("User disconnected");
    });
});
server.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}`);
});
