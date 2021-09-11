module.exports = {
    "env": {
        "es6": true,
        "jest": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": "off",
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};