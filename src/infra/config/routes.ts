import JoiValidator from '@infra/validator/JoiValidator'
import { httpMiddlewareAdapter } from '@presentation/adapters/http-middleware-adapter'
import CreateUserController from '@presentation/controllers/create-user/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { httpRouterAdapter } from '../../presentation/adapters/http-router-adapter'
import { createUserSchema } from '@infra/validator/schemas/create-user-schema'
import { authenticateUserSchema } from '@infra/validator/schemas/authenticate-user-schema'
import AuthenticateUserController from '@presentation/controllers/authenticate-user/AuthenticateUserController'
import ValidateJwtTokenController from '@presentation/controllers/authenticate-user/ValidateJwtTokenController'
import { validateJwtSchema } from '@infra/validator/schemas/validate-jwt-token'

export default async (router: Router): Promise<Router> => {
  const validateJwtTokenController = container.resolve(ValidateJwtTokenController)
  const validateJwtTokenValidator = new JoiValidator(validateJwtSchema)

  const createUserController = container.resolve(CreateUserController)
  const createUserValidator = new JoiValidator(createUserSchema)

  const authenticateUserController = container.resolve(AuthenticateUserController)
  const authenticateUserValidator = new JoiValidator(authenticateUserSchema)

  router.post(
    '/user/validate-token',
    httpMiddlewareAdapter(validateJwtTokenValidator),
    httpRouterAdapter(validateJwtTokenController),
  )

  router.post(
    '/user/authenticate',
    httpMiddlewareAdapter(authenticateUserValidator),
    httpRouterAdapter(authenticateUserController),
  )

  router.post('/user/create', httpMiddlewareAdapter(createUserValidator), httpRouterAdapter(createUserController))

  return router
}
