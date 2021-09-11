import dotenv from 'dotenv'

dotenv.config()

export default {
  db: process.env.DATABASE || 'mongodb://localhost:27017/sand-vegetables',
  port: process.env.PORT || 8080
}
