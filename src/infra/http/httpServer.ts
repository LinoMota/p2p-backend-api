import express from 'express'
import routerFunction from '../config/routes'
import prepareMiddlewares from '../middlewares/prepareMiddlewares'

import { expressjwt } from 'express-jwt'
import Jwt from '@infra/util/Jwt'

export const httpServer = async () => {
  const app = express()
  const router = express.Router()
  const appPort = process.env.APP_PORT ?? 5000

  await prepareMiddlewares(router)
  await routerFunction(router)

  app.use(
    expressjwt(Jwt.jwtConfig).unless({
      path: ['/user/authenticate', '/user/create'],
    }),
  )
  app.use(router)

  app.listen(appPort, () => {
    console.log(`Application HTTP running on port ${appPort}`)
  })
}
