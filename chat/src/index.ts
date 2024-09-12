import { server as WebSocketServer } from "websocket";
let http = require("http");

let server = http.createServer((req: any, res: any) => {
    console.log((new Date()) + req.url);
    res.writeHead(404, "Not Found");
    res.end()
})

server.listen(8080, () => {
    console.log("Listening on 8080");
})

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

function originIsAllowed(origin: string) {
    return true
}





