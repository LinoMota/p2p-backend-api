import Product from '@entities/Product'

export default interface ICreateProduct {
  create(data: Product): Promise<Product>
}
