import { injectable, inject } from 'tsyringe'
import User from '@entities/User'
import IAuthenticateUser from '@interfaces/use-cases/IAuthenticateUser'
import InvalidPasswordException from '@domain-exception/InvalidPasswordException'
import UserDoesNotExistException from '@domain-exception/UserDoesNotExistException'
import IUserRepository from '@interfaces/repositories/IUserRepository'
import IJWTHelper, { jwtToken } from '@interfaces/util/IJWTHelper'

@injectable()
export default class AuthenticateUser implements IAuthenticateUser {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
    @inject('IJWTHelper')
    private readonly jwt: IJWTHelper,
  ) {}

  authenticate(data: User): jwtToken | Promise<jwtToken> | UserDoesNotExistException | InvalidPasswordException {
    const user = this.repository.findByEmail(data.email)

    if (user === undefined) return new UserDoesNotExistException()

    if (data.password !== user.password) return new InvalidPasswordException()

    user.password = 'no-password-for-you-xD'

    return {
      token: this.jwt.sign(user, { expiresIn: '1h' }),
    }
  }

  validateToken(token: string): boolean {
    return this.jwt.verify(token) !== undefined
  }
}
