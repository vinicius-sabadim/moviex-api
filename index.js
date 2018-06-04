const config = require('./server/config')
const app = require('./server/app')
const logger = require('./server/utils/logger')

app.listen(config.port)
logger.log(`Listening on http://localhost:${ config.port }`)