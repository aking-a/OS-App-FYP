class Lock {
    constructor() {
        this.isLocked = false;
        this.queue = [];
    }

    async acquire() {
        return new Promise((resolve) => {
            if (!this.isLocked) {
                this.isLocked = true;
                resolve();
            } else {
                this.queue.push(resolve);
            }
        });
    }

    release() {
        if (this.queue.length > 0) {
            const resolve = this.queue.shift();
            resolve();
        } else {
            this.isLocked = false;
        }
    }
}
module.exports = Lock