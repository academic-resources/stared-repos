const { Schema, model } = require('mongoose')
const { UserSchema } = require('./schema')

const { Types } = Schema

module.exports = {
	User: model('User', new Schema(UserSchema))
}
