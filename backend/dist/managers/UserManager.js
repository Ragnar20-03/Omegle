"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const RoomManager_1 = require("./RoomManager");
class UserManager {
    constructor() {
        this.roomManager = new RoomManager_1.RoomManager();
        this.queue = [];
        this.users = [];
    }
    addUser(name, socket) {
        this.users.push({ name, socket });
        this.queue.push(socket.id);
        this.clearQueue();
        this.initHandlers(socket);
    }
    revmoveUser(socketId) {
        this.users.filter(x => x.socket.id === socketId);
        this.queue = this.queue.filter(x => x === socketId);
    }
    clearQueue() {
        if (this.queue.length < 2) {
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop());
        const user2 = this.users.find(x => x.socket.id === this.queue.pop());
        if (!user1 || !user2)
            return;
        const room = this.roomManager.createRoom(user1, user2);
        // for RTC them do the sdp stuff
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
        socket.on("answer", ({ sdp, roomId }) => {
        });
    }
}
exports.UserManager = UserManager;
