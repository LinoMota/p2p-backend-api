import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import GetStock from '@use-cases/stock/GetStock'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace GetUserControllerNamespace {
  export type Request = {
    userId: string
    brand: string
  }
}

export default class GetUserController implements Controller {
  async handle(request: GetUserControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const getUser = container.resolve(GetStock)

    const res = await getUser.findUserStocks(request.userId)

    if (res instanceof BaseError) return new ErrorResponse(res)

    if (request.brand !== undefined) {
      const filteredData = res?.filter((stock) => stock.brand === request.brand)
      return new SucessfulResponse(filteredData)
    }

    return new SucessfulResponse(res)
  }
}
