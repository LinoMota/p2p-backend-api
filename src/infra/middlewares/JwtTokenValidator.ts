import BaseError from '@common/BaseError'
import { Middleware } from '@infra/http/definitions'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import AuthenticateUser from '@use-cases/AuthenticateUser'
import { container } from 'tsyringe'

export namespace JwtTokenValidatorNamespace {
  export type Request = {
    authorization: string
  }
}

export default class JwtTokenValidator implements Middleware {
  async handle(request: JwtTokenValidatorNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const authenticateUser = container.resolve(AuthenticateUser)

    const res = authenticateUser.validateToken(request.authorization)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse({})
  }
}
