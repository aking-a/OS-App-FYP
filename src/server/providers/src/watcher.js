
class Watcher {

    /**
     * Create new instance
     * @param {Core} core Core reference
     */
    constructor(core) {
      /**
       * @type {Core}
       */
      this.core = core;

    }
  
    /**
     * Destroy instance
     */
    destroy() {
      if (this.adapter.destroy) {
        this.adapter.destroy();
      }
    }
  
    /**
     * Initializes adapter
     * @return {Promise<boolean>}
     */
    async init() {
      if (this.adapter.init) {
        return this.adapter.init();
      }
  
      return true;
    }
  

  }
  
  
  module.exports = Watcher;