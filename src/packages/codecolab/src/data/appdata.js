export class AppData {
    constructor(win, args, options, proc, osjs, socket, core) {
        this.win = win
        this.args = args
        this.options = options
        this.proc = proc
        this.osjs = osjs
        this.socket = socket
        this.core = core
    }
    getData() {
        return {
            win: this.win,
            args: this.args,
            options: this.options,
            proc: this.proc,
            osjs: this.osjs,
            socket: this.socket
        }
    }
}