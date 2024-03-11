class Lock {
    constructor() {
        this.locks = new Map();
    }

    async acquire(line) {
        if (!this.locks.has(line)) {
            this.locks.set(line, { isLocked: false });
        }

        const lock = this.locks.get(line);

        return true
    }

    release(line) {
        if (this.locks.has(line)) {
            const lock = this.locks.get(line);
            lock.isLocked = false;
        }
    }
}
module.exports = Lock;