import User from '@entities/User'
import IUserRepository from '@interfaces/repositories/IUserRepository'
import IPasswordEncryption from '@interfaces/util/IPasswordEncryption'
import ICreateUserValidator from '@interfaces/validation/ICreateUserValidator'

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
    return password === encryptedPassword
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
  findByEmail(email: string): User | undefined {
    return userDb.find((user) => user.email === email)
  }

  createUser(newUser: User) {
    return { ...newUser, id: 'any_id' }
  }
}

export class CreateUserValidationMock implements ICreateUserValidator {
  repository: any

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  emailExists(data: Partial<User>): boolean {
    const user = this.repository.findByEmail(data.email)
    return user !== undefined
  }
}
