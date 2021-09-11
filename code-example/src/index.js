const PORT = 80

const { app } = require('./app')

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
