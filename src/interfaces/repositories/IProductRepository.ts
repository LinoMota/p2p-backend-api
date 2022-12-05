import Product from '@entities/Product'

export default interface IProductRepository {
  createProduct(): Product
}
