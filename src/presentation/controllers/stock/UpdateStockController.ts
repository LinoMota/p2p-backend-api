import Stock from '@entities/Stock'
import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import UpdateStock from '@use-cases/stock/UpdateStock'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace UpdateStockControllerNamespace {
  export type Request = Partial<Stock>
}

export default class UpdateStockController implements Controller {
  async handle(request: UpdateStockControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    const updateStock = container.resolve(UpdateStock)

    const res = await updateStock.update(request as Stock)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res, 200)
  }
}
