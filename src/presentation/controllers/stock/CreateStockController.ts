import Stock from '@entities/Stock'
import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import CreateStock from '@use-cases/stock/CreateStock'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export namespace CreateStockControllerNamespace {
  export type Request = Partial<Stock>
}

export default class CreateStockController implements Controller {
  async handle(request: CreateStockControllerNamespace.Request): Promise<SucessfulResponse | ErrorResponse> {
    // @ts-ignore
    if (request.authorization !== undefined) delete request.authorization

    const createStock = container.resolve(CreateStock)

    const res = await createStock.create(request as Stock)

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res, 201)
  }
}
