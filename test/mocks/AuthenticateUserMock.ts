import IJWTHelper, { JwtSettings } from '../../src/interfaces/util/IJWTHelper'
import IUserRepository from '../../src/interfaces/repositories/IUserRepository'
import User from '../../src/domain/entities/User'

export const userDb: User[] = [
  {
    id: '1',
    name: 'any_name',
    email: 'existing_email@mail.com',
    password: 'any_password',
  },
]

const validToken = 'tokenzinbala-test'

export class UserRepositoryMock implements IUserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    return userDb.find((user) => user.email === email)
  }

  async createUser(newUser: User) {
    return { ...newUser, id: 'any_id' }
  }
}

export class JwtHelperMock implements IJWTHelper {
  decode (token: string) {
    return {
      id: '1',
      name: 'any_name',
      email: 'test@gmail.com',
    }
  }

  sign(data: any, settings: JwtSettings): string {
    return validToken
  }

  verify(token: string) {
    if (token === validToken) {
      return 'OK'
    }

    return undefined
  }
}
