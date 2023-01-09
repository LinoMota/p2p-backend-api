import { injectable, inject } from 'tsyringe'
import User from '@entities/User'
import UserDoesNotExistException from '@domain-exception/UserDoesNotExistException'
import IUserRepository from '@interfaces/repositories/IUserRepository'
import IJWTHelper from '@interfaces/util/IJWTHelper'
import IGetUser from '@interfaces/use-cases/IGetUser'
import InvalidJWTTokenException from '@domain-exception/InvalidJWTTokenException'

@injectable()
export default class GetUser implements IGetUser {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
    @inject('IJWTHelper')
    private readonly jwt: IJWTHelper,
  ) {}

  async getUser(token: string): Promise<Partial<User> | UserDoesNotExistException | InvalidJWTTokenException> {
    const data = this.jwt.decode(token) as User

    if (!data) return new InvalidJWTTokenException()

    const user = await this.repository.findByEmail(data.email)

    if (user === undefined) return new UserDoesNotExistException()

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}
