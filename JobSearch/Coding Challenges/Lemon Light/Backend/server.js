var express = require('express')

app = express()
port = process.env.PORT || 5000

app.listen(port)

console.log("Server up on Port 5000")