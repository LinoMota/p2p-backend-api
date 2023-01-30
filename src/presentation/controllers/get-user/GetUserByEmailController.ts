import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import GetUser from '@use-cases/GetUser'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'
export namespace GetUserByEmailControllerNamespace {
  export type Request = {
    email: string
  }
}

export default class GetUserByEmailController implements Controller {
  async handle(request: GetUserByEmailControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const getUser = container.resolve(GetUser)

    const res = await getUser.getUser(request.email)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
