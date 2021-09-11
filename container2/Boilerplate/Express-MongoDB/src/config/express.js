import express from 'express'
import helmet from 'helmet'

import mongoDB from './mongoose'

const app = express()

if (app.get('env') !== 'test') {
  mongoDB.connect()
  app.use(helmet())
}

app.use(express.json())
app.use('/api', require('./routes'))

export default app
