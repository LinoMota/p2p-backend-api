import { SucessfulResponse } from '@presentation/util'
import { Router } from 'express'
import { httpRouterAdapter } from '../../presentation/adapters/http-router-adapter'

export default async (router: Router): Promise<Router> => {
  router.get(
    '/',
    httpRouterAdapter({
      handle: async () => {
        const response: SucessfulResponse = new SucessfulResponse({ message: 'Hello World!' }, 200)
        return response
      },
    }),
  )

  return router
}
