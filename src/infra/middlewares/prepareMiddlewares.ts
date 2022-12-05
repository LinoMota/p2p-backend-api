import { Router } from 'express'
import cors from './cors'
import jsonParser from './jsonParser'
import logger from './logger'

export default (router: Router): Router => {
  router.use(logger())
  router.use(cors())
  router.use(jsonParser())
  return router
}
