
const dotenv = require('dotenv')

//== Load Environment Variables ==//

console.log('Loading environment variables...')

const environment = dotenv.config()
if (environment.error) throw environment.error

module.exports = { env: environment.parsed }
