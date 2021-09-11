const mongoose = require('mongoose')

//== MongoDB Connection ==//

const cluster = process.env.MONGO_CLUSTER
const db = process.env.MONGO_DBNAME
const url = `mongodb+srv://@${cluster}/${db}?retryWrites=true&w=majority`
const config = {
	user: process.env.MONGO_USER,
	pass: process.env.MONGO_PASSWORD,
	retryWrites: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}

const connectToDatabase = async () => {
	try {
		console.log('Connecting to MongoDB...')
		await mongoose.connect(url, config)
		console.log('Connecting to MongoDB ... DONE!')
	} catch (err) {
		console.error(err)
	}
}

module.exports = { connectToDatabase }