import User from '../../src/domain/entities/User'
import IUserRepository from '../../src/interfaces/repositories/IUserRepository'
import IPasswordEncryption from '../../src/interfaces/util/IPasswordEncryption'
import ICreateUserValidator from '../../src/interfaces/validation/ICreateUserValidator'

export const defaultUser: Partial<User> = {
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
}

export class EncryptionMock implements IPasswordEncryption {
  encrypt(password: string): string {
    return password
  }

  compare(password: string, encryptedPassword: string): boolean {
    return this.encrypt(password) === encryptedPassword
  }
}

const userDb: User[] = [
  {
    id: '1',
    name: 'any_name',
    email: 'existing_email@mail.com',
    password: 'any_password',
  },
]

export class UserRepositoryMock implements IUserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    return userDb.find((user) => user.email === email)
  }

  async createUser(newUser: User) {
    return { ...newUser, id: 'any_id' }
  }
}

export class CreateUserValidationMock implements ICreateUserValidator {
  repository: any

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  async emailExists(data: Partial<User>): Promise<boolean> {
    const user = this.repository.findByEmail(data.email)
    return user !== undefined
  }
}
