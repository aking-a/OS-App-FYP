// Define a Lock class
class Lock {
    // Constructor for the Lock class
    constructor() {
        // Initialize a new Map to store the locks
        this.locks = new Map();
    }

    // Method to acquire a lock for a line
    async acquire(line, timestamp) {
        // If there is no lock for the line
        if (!this.locks.has(line)) {
            // Create a new lock for the line with the given timestamp
            this.locks.set(line, { isLocked: true, timestamp: timestamp });
            // Return true to indicate that the lock was successfully acquired
            return true;
        } else {
            // If there is a lock for the line, get the lock
            const lock = this.locks.get(line);
            // If the lock is not currently locked or if the existing lock's timestamp is later than the given timestamp
            if (!lock.isLocked || lock.timestamp > timestamp) {
                // Update the lock to be locked and update the timestamp
                lock.isLocked = true;
                lock.timestamp = timestamp;
                // Return true to indicate that the lock was successfully acquired
                return true;
            }
        }
        // If the lock was not acquired, return false
        return false;
    }

    // Method to release a lock for a line
    release(line) {
        // If there is a lock for the line
        if (this.locks.has(line)) {
            // Get the lock and set it to be not locked
            const lock = this.locks.get(line);
            lock.isLocked = false;
        }
    }
}

// Export the Lock class
module.exports = Lock;