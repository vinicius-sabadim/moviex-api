import config from './server/config'
import app from './server/app'
import logger from './server/utils/logger'

app.listen(config.port)
logger.log(`Listening on http://localhost:${config.port}`)
