import {Socket} from "socket.io";
import {v4 as UUIDv4} from "uuid";
const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4(); // this will be our unique id for the room
        socket.join(roomId); // we will make socket connection join our room
        socket.emit("roomCreated", {roomId}); // emit the roomId to the client
        console.log(`Room created with ID: ${roomId}`);
    };
    const joinRoom = ({roomId}: {roomId: string}) => {
        console.log("New user has joined room ", roomId);
    };
    socket.on("createRoom", createRoom);
    socket.on("joinRoom", joinRoom);
};
export default roomHandler;
