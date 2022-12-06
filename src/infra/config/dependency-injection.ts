import { container } from 'tsyringe'

import UserRepository from '@repositories/UserRepository'
import PasswordEncryption from '@infra/util/PasswordEncryption'
import CreateUserValidation from 'domain/validation/CreateUserValidation'

container.register('IUserRepository', {
  useClass: UserRepository,
})

container.register('IPasswordEncryption', {
  useClass: PasswordEncryption,
})

container.register('ICreateUserValidator', {
  useClass: CreateUserValidation,
})
