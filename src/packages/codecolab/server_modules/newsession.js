const sessions = require('./database.js')
class CreateNewSession {
    constructor(data) {
        this.data = data
        this.sessionID = null
    }
    createSession(ws) {
        let inputId = crypto.randomUUID();
        if (!sessions[inputId]) {
            sessions[inputId] = { clients: [], sessionIden: this.data }
            sessions[inputId].clients.push(ws)
            sessions[inputId].clients[ws] = { owner: true }
            this.sessionID = inputId

            return inputId
        }


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
        if (this.sessionID != null) {
            const f_name = sessions[this.sessionID].sessionIden.file.filename
            const extension = f_name.split('.').pop();
            switch (extension) {
                case 'py': return 'python'; break;
                case 'html': return 'html'; break;
                case 'css': return 'css'; break;
                case 'java': return 'java'; break;
                case 'php': return 'php'; break;
                case 'js': return 'javascript'; break;
                case 'cs': return 'cs'; break;
                default: return 'language not in mime type'
            }
        }
    }
}
module.exports = CreateNewSession