
const { env } = require('./load-env')
const { app } = require('./src/app')
const { connectToDatabase } = require('./src/frameworks/mongodb')

//== Start Server ==//
void (async () => {
	//== Environment ==//
	console.log('Loaded environment:', env)

	//== Connect to database ==//
	await connectToDatabase()

	//== Start listening ==//
	const port = process.env.PORT
	app.listen(port, () => console.log(`Server listening on port ${port}`))
})()
