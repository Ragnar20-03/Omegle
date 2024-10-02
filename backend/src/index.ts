import { Server, Socket } from "socket.io";
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app)

const io = new Server(server)

io.on('connection', (socket: Socket) => {
    console.log("user connected !");

})

app.listen(5100, () => {
    console.log("server started on port number 5100")
})
