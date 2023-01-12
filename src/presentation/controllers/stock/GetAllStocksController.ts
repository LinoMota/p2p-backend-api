import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import GetStock from '@use-cases/stock/GetStock'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace GetAllStocksControllerNamespace {
  export type Request = {
    authorization: string
    brand: string
  }
}

export default class GetAllStocksController implements Controller {
  async handle(request: GetAllStocksControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const getStock = container.resolve(GetStock)

    const res = await getStock.findAllUsersStocks(request.authorization)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
