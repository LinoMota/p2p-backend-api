import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import GetStock from '@use-cases/stock/GetStock'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace GetSingleStockControllerNamespace {
  export type Request = {
    authorization: string
    stockId: string
  }
}

export default class GetSingleStockController implements Controller {
  async handle(request: GetSingleStockControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const getStock = container.resolve(GetStock)

    const res = await getStock.findOne(request.authorization, request.stockId)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
