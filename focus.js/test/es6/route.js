let express = require('express')
let app = express()
let path = require('path')

const port = process.env.PORT || 8000

// Set up static file paths
app.use(express.static(path.join(__dirname, './')));
app.use('/js', express.static(path.join(__dirname, './')));
app.use('/img', express.static(path.join(__dirname, './img')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'))
})

app.listen(port, () => {
    console.log('Focus is listening on port ' + port)
})