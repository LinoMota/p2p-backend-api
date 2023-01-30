import { Injectable } from '@nestjs/common'
import { PaginationFormat } from 'src/common/paginationFormat'
import BrandRepository from './brand.repository'

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async find(pagination: PaginationFormat) {
    return await this.brandRepository.find(pagination)
  }

  async findOne(id: string) {
    return await this.brandRepository.findOne(id)
  }
}
