const { ServiceProvider } = require('@osjs/common');
const Watcher = require('./src/watcher.js');

class WatcherService extends ServiceProvider {
    constructor(core) {
        super(core);

        this.watch = new Watcher(core);
    }

    destroy() {
        super.destroy();
        this.watch.destroy();
    }

    async init() {
        const app = this.core.make('osjs/express')
        function generateURLEncodedURL(baseURL, data) {
            // Encode the data string
            const encodedData = encodeURIComponent(data);

            // Combine base URL with encoded data
            const encodedURL = `${baseURL}?data=${encodedData}`;

            return encodedURL;
        }

        // Example usage:
        const baseURL = "http://localhost:8000/open";
        const data = "Some data to be encoded";
        const encodedURL = generateURLEncodedURL(baseURL, data);
        console.log(encodedURL);

        app.route('get', '/open', (req, res) => {
            const data = req.query.data;
            // const decodedData = decodeURIComponent(data);
            // const encodedData = encodeURIComponent(data);
            const url = `http://localhost:8000/?data=${data}`;
            res.redirect(url);
        });
    }
}

module.exports = WatcherService;