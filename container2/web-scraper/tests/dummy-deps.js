/**
 * A dummy dependency class used to test workflows
 */
class Deps {
    constructor() {}

    /**
     * Returns a new instance of this class
     */
    static Build() {
        return new Deps();
    }

    /**
     * Logs the item being processed by the workflow task queue
     * @param item
     */
    async dummy (item) {
        console.log(`Task queue processing ${item}`);
    }
};

module.exports = Deps;