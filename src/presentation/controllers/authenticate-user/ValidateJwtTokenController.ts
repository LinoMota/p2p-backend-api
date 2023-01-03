import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import AuthenticateUser from '@use-cases/AuthenticateUser'
import BaseError from 'common/BaseError'
import { container, injectable } from 'tsyringe'

export namespace AuthenticateUserControllerNamespace {
  export type Request = {
    authorization: string
  }
}

@injectable()
export default class ValidateJwtTokenController implements Controller {
  constructor() {}

  async handle(request: AuthenticateUserControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const authenticateUser = container.resolve(AuthenticateUser)

    const res = await authenticateUser.validateToken(request.authorization)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse({ isValid: true })
  }
}
