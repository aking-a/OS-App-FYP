export class Session {
    constructor(file,socket,username) {
        this.file = file
        this.socket = socket
        this.username = username
        this.language = null
        this.sharelink = null
        this.nav = null
        this.editorRef = null
        this.sessionID = null
        this.code = null
        this.state = null
        this.showPopup = null
        this.popupMessage = null
        this.isVisible = null
        this.userList= null
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
    setLink(sharelink){
        this.sharelink = sharelink
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
    setState(state){
        this.state = state
    }
    setPopupMessage(popupMessage){
        this.popupMessage = popupMessage
    }
    setShowPopup(showPopup){
        this.showPopup = showPopup
    }
    setIsVisible(isVisible){
        this.isVisible = isVisible
    }
    setUserList(userList){
        this.userList = userList
    }
 
}