module.exports = (handler) => (req, res, next) => handler(req, res, next).catch(next);
