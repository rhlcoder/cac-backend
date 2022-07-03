import express from 'express'
import config from 'config'
import connectDb from './utils/connectDb'
import logger from './utils/logger'
import routes from './routes'

const app = express()
const port = config.get<number>('port')

const start = async (): Promise<void> => {
  await connectDb()
  app.listen(port, () => {
    logger.info(`Server running on port: ${port}`)
    routes(app)
  })
}

void start()
