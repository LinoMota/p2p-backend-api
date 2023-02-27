import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { CreateHistoryDto } from './dto/create-history.dto'
import { FilterHistoryDto } from './dto/filter-history.dto'

@Injectable()
export class HistoryRepository {
  constructor(private readonly httpService: HttpService) {}

  async createHistory(history: CreateHistoryDto) {
    const { data } = await this.httpService.post(`/history`, history)
    return data
  }

  async findAll(filter: FilterHistoryDto) {
    const { data } = await this.httpService.get(`/history/`, {
      params: filter,
    })
    return data
  }
}
