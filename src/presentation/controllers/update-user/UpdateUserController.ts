import User from '@entities/User'
import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import UpdateUser from '@use-cases/UpdateUser'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace UpdateUserControllerNamespace {
  export type Request = Partial<User>
}

export default class UpdateUserController implements Controller {
  async handle(request: UpdateUserControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const updateUser = container.resolve(UpdateUser)

    const res = await updateUser.update(request as User)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res, 200)
  }
}
