// validators that can be used throughout the site

var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
}

module.exports = { isRealString };