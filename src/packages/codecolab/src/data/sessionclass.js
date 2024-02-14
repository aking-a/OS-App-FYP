export class Session {
    constructor(file,socket,username) {
        this.file = file
        this.socket = socket
        this.username = username
    }
    getData() {
        return {
            file: this.file,
            socket: this.socket,
            username: this.username,
            admin:admin
        }

    }
}