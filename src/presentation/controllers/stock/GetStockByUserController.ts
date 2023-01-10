import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import GetStock from '@use-cases/stock/GetStock'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace GetStockControllerNamespace {
  export type Request = {
    authorization: string
    brand: string
  }
}

export default class GetStockController implements Controller {
  async handle(request: GetStockControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const getStock = container.resolve(GetStock)

    const res = await getStock.findUserStocks(request.authorization)

    if (res instanceof BaseError) return new ErrorResponse(res)

    if (request.brand !== undefined) {
      const filteredData = res?.filter((stock) => stock.brand === request.brand)
      return new SucessfulResponse(filteredData)
    }

    return new SucessfulResponse(res)
  }
}
