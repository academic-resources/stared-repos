import mongoose from 'mongoose'
import env from './env'

export default {
  mongoose,
  connect: () => {
    mongoose.Promise = global.Promise
    mongoose.connect(env.db, { useNewUrlParser: true })
      .then(() => console('Connected to MongoDB'))
      .catch(err => console.log(err.message))
  },
  disconnect: () => mongoose.disconnect(),
}
