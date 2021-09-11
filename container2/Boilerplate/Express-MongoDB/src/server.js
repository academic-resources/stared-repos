import app from './config/express'
import env from './config/env'

app.listen(env.port, () =>
  console.log(`🤖 listening: http://localhost:${env.port}/ in ${app.get('env')} mode`))
