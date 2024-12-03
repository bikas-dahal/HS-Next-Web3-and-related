"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const pg_1 = require("pg");
const pgClient = new pg_1.Client(process.env.DB_URL);
// console.log(process.env.DB_URL);
// console.log(pgClient); 
// use parameterized query to prevent sql injection
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    console.log(title, description);
    const query = 'INSERT INTO todo (title, description) VALUES ($1, $2) RETURNING *';
    const values = [title, description];
    const result = yield pgClient.query(query, values);
    res.json(result);
}));
app.get('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pgClient.query('SELECT * FROM todo');
    res.json(result.rows);
}));
app.listen(3000, () => {
    console.log('Server is running in port 3000');
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        const res = yield pgClient.query('SELECT * FROM todo');
        console.log(res.rows);
    });
}
main();
// import { WebSocket, WebSocketServer } from "ws";
// const wss = new WebSocketServer({ port: 8080 })
// interface User {
//     socket: WebSocket
//     room: string
// }
// let userCount = 0
// let allSocket: User[] = []
// wss.on('connection', function(socket) {
//     socket.send('syam')
//     userCount++
//         console.log('User count', userCount);
//     socket.on('message', (e) => {
//         const parsedMessages = JSON.parse(e.toString())
//         if (parsedMessages.type === 'join') {
//             const user = {
//                 socket,
//                 room: parsedMessages.payload.room
//             }
//             allSocket.push(user)
//             return
//         }
//         if (parsedMessages.type === 'message') {
//             const currentUserRoom = allSocket.find(user => user.socket === socket)?.room
//             if (!currentUserRoom) {
//                 return
//             }
//             allSocket.forEach(user => {
//                 if (user.room === currentUserRoom) {
//                     user.socket.send(parsedMessages.payload.message)
//                 }
//             })
//             return
//         }
//         console.log(allSocket);
//     })
//     socket.on('close', (e) => {
//         userCount--
//     })
// })
