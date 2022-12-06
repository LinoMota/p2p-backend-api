import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import AuthenticateUser from '@use-cases/AuthenticateUser'
import BaseError from 'common/BaseError'
import { container, injectable } from 'tsyringe'

export namespace AuthenticateUserControllerNamespace {
  export type Request = {
    token: string
  }
}

@injectable()
export default class ValidateJwtTokenController implements Controller {
  constructor() {}

  async handle(request: AuthenticateUserControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const authenticateUser = container.resolve(AuthenticateUser)

    const res = {
      isValid: await authenticateUser.validateToken(request.token),
    }

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
