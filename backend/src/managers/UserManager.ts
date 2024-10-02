import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";


export interface IUser {
    socket: Socket,
    name: string
}
export class UserManager {
    private users: IUser[]
    private roomManager: RoomManager
    private queue: string[]
    constructor() {
        this.roomManager = new RoomManager()
        this.queue = []
        this.users = []
    }
    addUser(name: string, socket: Socket) {
        this.users.push({ name, socket })
        this.queue.push(socket.id)
        this.clearQueue()
        this.initHandlers(socket);
    }

    revmoveUser(socketId: string) {
        this.users.filter(x => x.socket.id === socketId)
        this.queue = this.queue.filter(x => x === socketId)
    }

    clearQueue() {
        if (this.queue.length < 2) {
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop())
        const user2 = this.users.find(x => x.socket.id === this.queue.pop())
        if (!user1 || !user2) return;
        const room = this.roomManager.createRoom(user1, user2)
        // for RTC them do the sdp stuff
    }

    initHandlers(socket: Socket) {
        socket.on("offer", ({ sdp, roomId }: { sdp: string, roomId: string }) => {
            this.roomManager.onOffer(roomId, sdp)
        })

        socket.on("answer", ({ sdp, roomId }: { sdp: string, roomId: string }) => {

        })
    }
}   