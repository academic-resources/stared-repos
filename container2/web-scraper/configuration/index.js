const dotenv = require('dotenv');

dotenv.config();

class Configuration {
    constructor() {
        this.config = process.env;
    }

    /**
     * Returns a new instance of this class
     */
    static Build() {
        return new Configuration();
    }

    /**
     * Returns whether key is in the config
     * @param key
     * @return bool
     */
    contains(key) {
        return this.config.hasOwnProperty(key);
    }

    /**
     * Returns an element in the config
     * @param key
     * @return value | undefined
     */
    get(key) {
        if (this.contains(key)) {
            return this.config[key];
        }

        return undefined;
    }

    /**
     * Sets a key with a value in the config
     * @param key
     * @param value
     */
    set(key, value) {
        this.config[key] = value;
    }
};

module.exports = Configuration;