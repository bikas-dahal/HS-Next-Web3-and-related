"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSocket = [];
wss.on('connection', function (socket) {
    socket.send('syam');
    userCount++;
    console.log('User count', userCount);
    socket.on('message', (e) => {
        var _a;
        const parsedMessages = JSON.parse(e.toString());
        if (parsedMessages.type === 'join') {
            const user = {
                socket,
                room: parsedMessages.payload.room
            };
            allSocket.push(user);
            return;
        }
        if (parsedMessages.type === 'message') {
            const currentUserRoom = (_a = allSocket.find(user => user.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
            if (!currentUserRoom) {
                return;
            }
            allSocket.forEach(user => {
                if (user.room === currentUserRoom) {
                    user.socket.send(parsedMessages.payload.message);
                }
            });
            return;
        }
        console.log(allSocket);
    });
    socket.on('close', (e) => {
        userCount--;
    });
});
