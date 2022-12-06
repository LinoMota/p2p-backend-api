import User from '@entities/User'
import { Controller } from '@infra/http/definitions/Controller'
import IPasswordEncryption from '@interfaces/util/IPasswordEncryption'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import AuthenticateUser from '@use-cases/AuthenticateUser'
import BaseError from 'common/BaseError'
import { container, inject, injectable } from 'tsyringe'

export namespace AuthenticateUserControllerNamespace {
  export type Request = Partial<User>
}

@injectable()
export default class AuthenticateUserController implements Controller {
  constructor(
    @inject('IPasswordEncryption')
    private readonly encryption: IPasswordEncryption,
  ) {}

  async handle(request: AuthenticateUserControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const authenticateUser = container.resolve(AuthenticateUser)

    const payload = request as User

    payload.password = this.encryption.encrypt(payload.password)

    const res = await authenticateUser.authenticate(payload as User)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
