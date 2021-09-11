function setRoutes(app) {
	app.get('/', (req, res) => {
		res.status(200).send('Hello amalgaworld')
	})

	return app
}

module.exports = { setRoutes }
