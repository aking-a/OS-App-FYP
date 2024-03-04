class Lock {
    constructor() {
        this.locks = new Map();
    }

    async acquire(line) {
        if (!this.locks.has(line)) {
            this.locks.set(line, { isLocked: false, queue: [] });
        }

        const lock = this.locks.get(line);

        return new Promise((resolve) => {
            if (!lock.isLocked) {
                lock.isLocked = true;
                resolve();
            } else {
                lock.queue.push(resolve);
            }
        });
    }

    release(line) {
        if (this.locks.has(line)) {
            const lock = this.locks.get(line);

            if (lock.queue.length > 0) {
                const resolve = lock.queue.shift();
                resolve();
            } else {
                lock.isLocked = false;
            }
        }
    }
}
module.exports = Lock;