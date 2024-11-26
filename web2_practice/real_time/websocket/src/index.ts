import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 })

interface User {
    socket: WebSocket
    room: string
}

let userCount = 0
let allSocket: User[] = []

wss.on('connection', function(socket) {
    
    

    socket.send('syam')
    userCount++
        console.log('User count', userCount);
        

    socket.on('message', (e) => {
        const parsedMessages = JSON.parse(e.toString())

        if (parsedMessages.type === 'join') {
            const user = {
                socket,
                room: parsedMessages.payload.room
            }
            allSocket.push(user)
            return
        }

        if (parsedMessages.type === 'message') {
             
            const currentUserRoom = allSocket.find(user => user.socket === socket)?.room

            if (!currentUserRoom) {
                return
            }

            allSocket.forEach(user => {
                if (user.room === currentUserRoom) {
                    user.socket.send(parsedMessages.payload.message)
                }
            })
            
            return
        }

        console.log(allSocket);
        

    })

    socket.on('close', (e) => {
        userCount--
    })
})

