class CreateNewSession {
    constructor(data) {
        this.data = data
        this.instance = null
        this.language = null
    }
    createSession(ws) {
        this.instance = { clients: [], sessionIden: this.data }
        this.instance.clients.push(ws)

    }
    createShareLink(inputID) {
        const baseURL = "http://localhost:8000/open";
        // Encode the data string
        const encodedData = encodeURIComponent(inputID);

        // Combine base URL with encoded data
        const encodedURL = `${baseURL}?data=${encodedData}`;

        return encodedURL;
    }
    getLanguage() {
        const f_name = this.instance.sessionIden.file.file.filename
        const extension = f_name.split('.').pop();
        switch (extension) {
            case 'py': this.language = 'python'; return 'python'; break;
            case 'html': this.language = 'html'; return 'html'; break;
            case 'css': this.language = 'css'; return 'css'; break;
            case 'java': this.language = 'java'; return 'java'; break;
            case 'php': this.language = 'php'; return 'php'; break;
            case 'js': this.language = 'javascript'; return 'javascript'; break;
            case 'cs': this.language = 'cs'; return 'cs'; break;
            default: this.language = 'notfound'; return 'notfound'
        }

    }
}
module.exports = CreateNewSession