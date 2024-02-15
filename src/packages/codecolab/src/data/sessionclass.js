export class Session {
    constructor(file,socket,username) {
        this.file = file
        this.socket = socket
        this.username = username
        this.language = null
        this.link = null
        this.nav = null
        this.editorRef = null
        this.sessionID = null
        this.code = null
    }
    getData() {
        return {
            file: this.file,
            socket: this.socket,
            username: this.username,
            language:this.language,
            link:this.link,
            nav:this.nav,
            editorRef:this.editorRef
        }

    }
    setLink(link){
        this.link = link
    }
    setLanguage(language){
        this.language = language
    }
    setNav(nav){
        this.nav = nav
    }
    setEditor(editorRef){
        this.editorRef = editorRef
    }
    setSessionID(sessionID){
        this.sessionID = sessionID
    }
    setCode(code){
        this.code = code
    }
}