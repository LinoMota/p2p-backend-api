import JoiValidator from '@infra/validator/JoiValidator'
import { httpMiddlewareAdapter } from '@presentation/adapters/http-middleware-adapter'
import CreateUserController from '@presentation/controllers/create-user/CreateUserController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { httpRouterAdapter } from '../../presentation/adapters/http-router-adapter'
import { createUserSchema } from '@infra/validator/schemas/create-user-schema'

export default async (router: Router): Promise<Router> => {
  const createUserController = container.resolve(CreateUserController)
  const createUserValidator = new JoiValidator(createUserSchema)

  router.post('/user/create', httpMiddlewareAdapter(createUserValidator), httpRouterAdapter(createUserController))

  return router
}
