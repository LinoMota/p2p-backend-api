import Product from '@entities/Product'
import IProductRepository from '@irepositories/IProductRepository'
import { injectable } from 'tsyringe'

@injectable()
export default class ProductRepository implements IProductRepository {
  createProduct(): Product {
    const prod: Product = { id: '123' }
    return prod
  }
}
