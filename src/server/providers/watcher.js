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

        app.route('get', '/open', (req, res) => {
            let data = req.query.data;
            let ans = decodeURIComponent(data);
            let page = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Dynamic Page</title>
            </head>
            <body>
                <script>
                    function loadPage(ans) {
                        history.pushState(null, null, 'http://localhost:8000');
                        fetch('/index.html')
                            .then(resp => resp.text())
                            .then(hdoc => {
                                const base = new URL('/', location);
                                hdoc = hdoc.replace('<head>', '<head><base href="' + base + '">');
                                document.open();
                                document.write(hdoc);
                                document.close();
                                // update config conforming to document.baseURI
                                window.webpackJsonp = [[
                                    [/*anonymous chunk*/],
                                    {
                                        'rwcfgurimod': (m, e, r) => {
                                            const cfg = r('./src/client/config.js');
                                            const href = document.baseURI;
                                            const pathname = new URL(href).pathname;
                                            (cfg.http ||= {}).public = pathname;
                                            (cfg.http ||= {}).uri = href;
                                            (cfg.ws ||= {}).uri = href.replace(/^http/, 'ws');
                                        }
                                    },
                                    [["rwcfgurimod", "osjs"]]
                                ]];
                                // run package
                                const groups = [], cb = {};
                                const { group, groupEnd } = console;
                                const delay = (f) => f && setTimeout(f);
                                console.group = (n) => (groups.push(n), group(n));
                                console.groupEnd = (n) => (n = groups.pop(), groupEnd(), delay(cb[n]));
                                cb['Session::load()'] = () => {
                                    const name = 'codecolab';
                                    const args = ans;
                                    const options = {joinstate:true};
                                    OSjs.run(name, args, options);
                                };
                            });
                    }
                    loadPage('${ans}');
                </script>
            </body>
            </html>`
            res.send(page);
        })
    }
}

module.exports = WatcherService;