import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { PaginationFormat } from 'src/common/paginationFormat'

@Injectable()
export default class BrandRepository {
  constructor(private readonly httpService: HttpService) {}

  async find(pagination: PaginationFormat) {
    const { data } = await this.httpService.get(`/brand/`, {
      params: pagination,
    })
    return data
  }

  async findOne(id: string) {
    const { data } = await this.httpService.get(`/brand/${id}`)
    return data
  }
}
