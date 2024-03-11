export class Session {
    constructor(file,socket,username) {
        this.file = file
        this.socket = socket
        this.username = username
        this.language = null
        this.sharelink = null
        this.editorRef = null
        this.sessionID = null
        this.code = null
        this.showPopup = null
        this.popupMessage = null
        this.isVisible = null
        this.userlist= null
        this.usernameslist = null
        this.itemlist = null
        this.ProgrammaticChange = false
        this.monaco = null
        this.lockedlines = new Set()
        this.curline = null
    }
}