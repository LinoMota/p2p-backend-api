import { container } from 'tsyringe'

import UserRepository from '@repositories/UserRepository'
import PasswordEncryption from '@infra/util/PasswordEncryption'
import CreateUserValidation from 'domain/validation/CreateUserValidation'
import UpdateUserValidation from 'domain/validation/UpdateUserValidation'
import Jwt from '@infra/util/Jwt'
import FarofaApiClient from '@infra/client/FarofaApiClient'
import StockRepository from '@repositories/StockRepostiory'
import BrandRepository from '@repositories/BrandRepository'

container.register('JSON_WEB_TOKEN_SECRET', {
  useValue: process.env.JSON_WEB_TOKEN_SECRET || 'default-secret',
})

container.register('FAROFA_API_URL', {
  useValue: process.env.FAROFA_API_URL || 'no-url',
})

container.register('IJWTHelper', { useClass: Jwt })

container.register('FarofaApiClient', {
  useClass: FarofaApiClient,
})

container.register('IStockRepository', {
  useClass: StockRepository,
})

container.register('IBrandRepository', {
  useClass: BrandRepository,
})

container.register('IUserRepository', {
  useClass: UserRepository,
})

container.register('IPasswordEncryption', {
  useClass: PasswordEncryption,
})

container.register('ICreateUserValidation', {
  useClass: CreateUserValidation,
})

container.register('IUpdateUserValidator', {
  useClass: UpdateUserValidation,
})
