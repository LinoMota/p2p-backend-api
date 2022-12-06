
import { injectable, inject } from 'tsyringe'

import User from '@entities/User'
import IUserRepository from '@irepositories/IUserRepository'
import ICreateUser from '@interfaces/use-cases/ICreateUser'
import IPasswordEncryption from '@interfaces/util/IPasswordEncryption'
import ICreateUserValidator from '@interfaces/validation/ICreateUserValidator'
import EmailExistsException from '../exception/EmailExistsException'

@injectable()
export default class CreateUser implements ICreateUser {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
    @inject('IPasswordEncryption')
    private readonly encryption: IPasswordEncryption,
    @inject('ICreateUserValidator')
    private readonly validator: ICreateUserValidator,
  ) {}

  async create(data: Partial<User>): Promise<User | EmailExistsException> {
    if (this.validator.emailExists(data)) return new EmailExistsException()

    const newUser = {
      ...(data as User),
      password: this.encryption.encrypt(data.password || ''),
    }

    return this.repository.createUser(newUser)
  }
}
