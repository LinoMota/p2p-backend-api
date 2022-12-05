import Product from '@entities/Product'
import IProductRepository from '@irepositories/IProductRepository'
import ICreateProduct from 'interfaces/usecases/ICreateProduct'
import { injectable, inject } from 'tsyringe'

@injectable()
export default class CreateProduct implements ICreateProduct {
  constructor(
    @inject('IProductRepository')
    private readonly repository: IProductRepository,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    return await this.repository.createProduct()
  }
}
