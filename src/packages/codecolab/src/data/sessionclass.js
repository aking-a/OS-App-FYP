export class Session {
    constructor(file,socket,username) {
        this.file = file
        this.socket = socket
        this.username = username
        this.language = null
        this.link = null
        this.nav = null
    }
    getData() {
        return {
            file: this.file,
            socket: this.socket,
            username: this.username,
            language:this.language,
            link:this.link,
            nav:this.nav,
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
}