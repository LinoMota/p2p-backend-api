import Product from '@entities/Product'
import { Controller } from '@infra/http/definitions/Controller'
import CreateProduct from '@use-cases/CreateUser'
import SucessfulResponse from 'presentation/util/SucessfulResponse'
import { container } from 'tsyringe'

export namespace CreateProductControllerNamespace {
  export type Request = Partial<Product>
}

export default class CreateProductController implements Controller {
  async handle(request: CreateProductControllerNamespace.Request): Promise<SucessfulResponse> {
    const createProduct = container.resolve(CreateProduct)

    const res = await createProduct.create(request)

    return new SucessfulResponse(res)
  }
}
