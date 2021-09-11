const dumpUser = (user) => ({ ...user._doc, password: null })

module.exports = { dumpUser }
