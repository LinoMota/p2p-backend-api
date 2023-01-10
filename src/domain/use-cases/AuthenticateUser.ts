import { injectable, inject } from 'tsyringe'
import User from '@entities/User'
import IAuthenticateUser from '@interfaces/use-cases/IAuthenticateUser'
import InvalidPasswordException from '@domain-exception/InvalidPasswordException'
import UserDoesNotExistException from '@domain-exception/UserDoesNotExistException'
import IUserRepository from '@interfaces/repositories/IUserRepository'
import IJWTHelper, { jwtToken } from '@interfaces/util/IJWTHelper'
import IPasswordEncryption from '@interfaces/util/IPasswordEncryption'
import InvalidJWTTokenException from '@domain-exception/InvalidJWTTokenException'

@injectable()
export default class AuthenticateUser implements IAuthenticateUser {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
    @inject('IPasswordEncryption')
    private readonly encryption: IPasswordEncryption,
    @inject('IJWTHelper')
    private readonly jwt: IJWTHelper,
  ) {}

  async authenticate(data: User): Promise<jwtToken | UserDoesNotExistException | InvalidPasswordException> {
    const user = (await this.repository.findByEmail(data.email)) as unknown as User

    if (user === undefined) return new UserDoesNotExistException()

    if (this.encryption.compare(data.password, user.password)) return new InvalidPasswordException()

    user.password = 'no-password'

    return {
      token: this.jwt.sign(user, { expiresIn: '1d' }),
    }
  }

  validateToken(token: string): string | InvalidJWTTokenException {
    const tokenData = this.jwt.verify(token)

    if (tokenData !== undefined) {
      return 'OK'
    }

    return new InvalidJWTTokenException()
  }
}
