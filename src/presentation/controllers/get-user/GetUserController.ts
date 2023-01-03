import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import GetUser from '@use-cases/GetUser'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'
export namespace GetUserControllerNamespace {
  export type Request = {
    authorization: string
  }
}

export default class GetUserController implements Controller {
  async handle(request: GetUserControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const getUser = container.resolve(GetUser)

    const res = await getUser.getUser(request.authorization)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
