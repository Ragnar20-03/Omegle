import { IUser } from "./UserManager";

let GLOBAL_ROOM_ID = 1;

interface IRoom {
    user1: IUser,
    user2: IUser,
}
export class RoomManager {
    private rooms: Map<string, IRoom>
    constructor() {
        this.rooms = new Map<string, IRoom>()
    }

    createRoom(user1: IUser, user2: IUser) {
        const roomId = this.generate();
        this.rooms.set(roomId.toString(), {
            user1, user2
        })

        user1?.socket.emit("send-offer", {
            roomId
        })
    }

    onOffer(roomId: string, sdp: string) {
        const user2 = this.rooms.get(roomId)?.user2
        user2?.socket.emit("offer", {
            sdp
        })
    }

    onAnswer(roomId: string, sdp: string) {
        const user1 = this.rooms.get(roomId)?.user1
        user1?.socket.emit("offer", {
            sdp
        })
    }

    generate() {
        return GLOBAL_ROOM_ID++
    }
}