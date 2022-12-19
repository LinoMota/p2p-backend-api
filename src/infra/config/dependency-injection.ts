import { container } from 'tsyringe'

import UserRepository from '@repositories/UserRepository'
import PasswordEncryption from '@infra/util/PasswordEncryption'
import CreateUserValidation from 'domain/validation/CreateUserValidation'
import Jwt from '@infra/util/Jwt'
import FarofaApiClient from '@infra/client/FarofaApiClient'

container.register('JSON_WEB_TOKEN_SECRET', {
  useValue: process.env.JSON_WEB_TOKEN_SECRET,
})

container.register('FAROFA_API_URL', {
  useValue: process.env.FAROFA_API_URL,
})

container.register('IJWTHelper', { useClass: Jwt })

container.register('FarofaApiClient', {
  useClass: FarofaApiClient,
})

container.register('IUserRepository', {
  useClass: UserRepository,
})

container.register('IPasswordEncryption', {
  useClass: PasswordEncryption,
})

container.register('ICreateUserValidator', {
  useClass: CreateUserValidation,
})
