import JoiValidator from '@infra/validator/JoiValidator'
import { httpMiddlewareAdapter } from '@presentation/adapters/http-middleware-adapter'
import CreateUserController from '@presentation/controllers/create-user/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { httpRouterAdapter } from '../../presentation/adapters/http-router-adapter'
import { createUserSchema } from '@infra/validator/schemas/create-user-schema'

import { validateJwtSchema } from '@infra/validator/schemas/validate-jwt-token'
import AuthenticateUserController from '@presentation/controllers/authenticate-user/AuthenticateUserController'
import ValidateJwtTokenController from '@presentation/controllers/authenticate-user/ValidateJwtTokenController'
import GetUserController from '@presentation/controllers/get-user/GetUserController'
import UpdateUserController from '@presentation/controllers/update-user/UpdateUserController'
import GetBrandController from '@presentation/controllers/brand/GetBrandController'
import CreateStockController from '@presentation/controllers/stock/CreateStockController'
import UpdateStockController from '@presentation/controllers/stock/UpdateStockController'
import GetStockByUserController from '@presentation/controllers/stock/GetStockByUserController'

export default async (router: Router): Promise<Router> => {
  const updateUserController = container.resolve(UpdateUserController)

  const validateJwtTokenController = container.resolve(ValidateJwtTokenController)
  const validateJwtTokenValidator = new JoiValidator(validateJwtSchema)

  const createUserController = container.resolve(CreateUserController)
  const createUserValidator = new JoiValidator(createUserSchema)

  const authenticateUserController = container.resolve(AuthenticateUserController)

  const getUserController = container.resolve(GetUserController)

  const getBrandController = container.resolve(GetBrandController)
  const createStockController = container.resolve(CreateStockController)
  const updateStockController = container.resolve(UpdateStockController)
  const getStockByUserController = container.resolve(GetStockByUserController)

  router.post(
    '/user/validate-token',
    httpMiddlewareAdapter(validateJwtTokenValidator),
    httpRouterAdapter(validateJwtTokenController),
  )

  router.post('/user/authenticate', httpRouterAdapter(authenticateUserController))

  router.post('/user/create', httpMiddlewareAdapter(createUserValidator), httpRouterAdapter(createUserController))

  router.get('/user/me', httpRouterAdapter(getUserController))

  router.post('/user/me', httpRouterAdapter(createUserController))

  router.put('/user/me', httpRouterAdapter(updateUserController))

  router.get('/brand', httpRouterAdapter(getBrandController))

  router.post(
    '/stock',

    httpRouterAdapter(createStockController),
  )

  router.put('/stock', httpRouterAdapter(updateStockController))

  router.get('/user/stocks', httpRouterAdapter(getStockByUserController))

  router.get('/healthcheck', (req, res) => {
    res.status(200).send('OK')
  })

  return router
}
