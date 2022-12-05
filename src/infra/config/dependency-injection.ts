import { container } from 'tsyringe'

import ProductRepository from '@repositories/ProductRepository'

container.register('IProductRepository', {
  useClass: ProductRepository,
})
