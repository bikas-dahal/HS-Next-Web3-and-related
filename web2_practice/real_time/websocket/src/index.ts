import express  from 'express';
import 'dotenv/config'
import { Client } from 'pg';


const pgClient = new Client(process.env.DB_URL)

// console.log(process.env.DB_URL);
// console.log(pgClient); 

// use parameterized query to prevent sql injection
const app = express()

app.use(express.json())

app.post('/todo', async (req, res) => {
    const { title, description } = req.body
    console.log(title, description);

    await pgClient.query('BEGIN')
    
    const query = 'INSERT INTO todo (title, description) VALUES ($1, $2) RETURNING *'
    const values = [title, description]
    const result = await pgClient.query(query, values)

    await pgClient.query('COMMIT')
     
    res.json(result)
})

app.get('/todo', async (req, res) => {
    const result = await pgClient.query('SELECT * FROM todo')
    res.json(result.rows)
})
 
app.listen(3000, () => {
    console.log('Server is running in port 3000');
})

async function main() {
    await pgClient.connect()
    const res = await pgClient.query('SELECT * FROM todo')
    console.log(res.rows);
}

main()
 

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

