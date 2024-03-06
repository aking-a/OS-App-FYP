class CreateNewSession {
    constructor(data) {
        this.data = data
        this.instance = null
        this.language = null
    }
    //pushes ws onto clients array
    createSession(ws) {
        this.instance = { clients: [],sessionFile: this.data }
        this.instance.clients.push(ws)

    }
    //creates a share link for the session with /open?data= appended to the base urlso it that a cutsom service provider will be activated
    createShareLink(inputID) {
        const baseURL = "http://localhost:8000/open";
        // Encode the data string
        const encodedData = encodeURIComponent(inputID);

        // Combine base URL with encoded data
        const encodedURL = `${baseURL}?data=${encodedData}`;

        return encodedURL;
    }
    //gets the language of the file
    getLanguage() {
        const f_name = this.instance.sessionFile.file.filename
        const extension = f_name.split('.').pop();
        switch (extension) {
            case 'py': this.language = 'python'; return 'python'; break;
            case 'html': this.language = 'html'; return 'html'; break;
            case 'css': this.language = 'css'; return 'css'; break;
            case 'java': this.language = 'java'; return 'java'; break;
            case 'php': this.language = 'php'; return 'php'; break;
            case 'js': this.language = 'javascript'; return 'javascript'; break;
            case 'cs': this.language = 'csharp'; return 'csharp'; break;
            default: this.language = 'notfound'; return 'notfound'
        }

    }
}
module.exports = CreateNewSession