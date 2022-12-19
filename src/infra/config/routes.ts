import JoiValidator from '@infra/validator/JoiValidator'
import { httpMiddlewareAdapter } from '@presentation/adapters/http-middleware-adapter'
import CreateUserController from '@presentation/controllers/create-user/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { httpRouterAdapter } from '../../presentation/adapters/http-router-adapter'
import { createUserSchema } from '@infra/validator/schemas/create-user-schema'
import { authenticateUserSchema } from '@infra/validator/schemas/authenticate-user-schema'
import { validateJwtSchema } from '@infra/validator/schemas/validate-jwt-token'
import AuthenticateUserController from '@presentation/controllers/authenticate-user/AuthenticateUserController'
import ValidateJwtTokenController from '@presentation/controllers/authenticate-user/ValidateJwtTokenController'
import GetUserController from '@presentation/controllers/get-user/GetUserController'
import JwtTokenValidator from '@infra/middlewares/JwtTokenValidator'

export default async (router: Router): Promise<Router> => {
  const validateJwtTokenController = container.resolve(ValidateJwtTokenController)
  const validateJwtTokenValidator = new JoiValidator(validateJwtSchema)

  const createUserController = container.resolve(CreateUserController)
  const createUserValidator = new JoiValidator(createUserSchema)

  const authenticateUserController = container.resolve(AuthenticateUserController)
  const authenticateUserValidator = new JoiValidator(authenticateUserSchema)

  const getUserController = container.resolve(GetUserController)

  const jwtTokenValidator = new JwtTokenValidator()

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

  router.get(
    '/user/me',
    httpMiddlewareAdapter(jwtTokenValidator),
    httpRouterAdapter(getUserController),
  )

  return router
}
