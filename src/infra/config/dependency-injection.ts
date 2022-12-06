import { container } from 'tsyringe'

import UserRepository from '@repositories/UserRepository'
import PasswordEncryption from '@infra/util/PasswordEncryption'
import CreateUserValidation from 'domain/validation/CreateUserValidation'
import Jwt from '@infra/util/Jwt'

container.register('JSON_WEB_TOKEN_SECRET', {
  useValue: process.env.JSON_WEB_TOKEN_SECRET,
})

container.register('IJWTHelper', { useClass: Jwt })

container.register('IUserRepository', {
  useClass: UserRepository,
})

container.register('IPasswordEncryption', {
  useClass: PasswordEncryption,
})

container.register('ICreateUserValidator', {
  useClass: CreateUserValidation,
})
