import { Controller } from '@infra/http/definitions/Controller'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import GetBrand from '@use-cases/brand/GetBrand'
import BaseError from 'common/BaseError'
import { container } from 'tsyringe'

export default class GetBrandController implements Controller {
  async handle(): Promise<SucessfulResponse | ErrorResponse> {
    const getBrand = container.resolve(GetBrand)

    const res = await getBrand.getAll()

    if (res instanceof BaseError) return new ErrorResponse(res)

    return new SucessfulResponse(res)
  }
}
