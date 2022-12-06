import User from '@entities/User'
import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import CreateUser from '@use-cases/CreateUser'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace CreateUserControllerNamespace {
  export type Request = Partial<User>
}

export default class CreateUserController implements Controller {
  async handle(request: CreateUserControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const createUser = container.resolve(CreateUser)

    const res = await createUser.create(request)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
