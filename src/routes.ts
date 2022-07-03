import { Express } from 'express'

function routes (app: Express): void {
  app.get('/', (_, res) => {
    res.send('cac backend esta funcionando')
  })
  app.get('/healthcheck', (_, res) => {
    res.status(200).send('/healthcheck esta funcionando')
  })
  app.get('/api', (_, res) => {
    res.status(200).send('/api esta funcionando')
  })
}

export default routes
