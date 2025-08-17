import {Socket} from "socket.io";
import {v4 as UUIDv4} from "uuid";
import type IRoomParams from "../interfaces/IRoomParams";
const rooms: Record<string, string[]> = {}; // to keep track of rooms and their peer members
const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4(); // this will be our unique id for the room
        socket.join(roomId); // we will make socket connection join our room
        rooms[roomId] = []; // initialize the room in our in-memory map
        socket.emit("roomCreated", {roomId}); // emit the roomId to the client
        console.log(`Room created with ID: ${roomId}`);
    };
    const joinRoom = ({roomId, peerId}: IRoomParams) => {
        if (rooms[roomId]) {
            console.log(`New user has joined room ${roomId} with peer id as ${peerId}`);
            rooms[roomId].push(peerId); // add the peerId of user to the in memory map
            socket.join(roomId); // make the socket connection join the room
        }
    };
    socket.on("createRoom", createRoom);
    socket.on("joinRoom", joinRoom);
};
export default roomHandler;
