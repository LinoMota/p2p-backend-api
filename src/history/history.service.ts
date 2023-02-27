import { Injectable } from '@nestjs/common'
import { CreateHistoryDto } from './dto/create-history.dto'
import { FilterHistoryDto } from './dto/filter-history.dto'
import { HistoryRepository } from './history.repository'

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}
  async create(createHistoryDto: CreateHistoryDto) {
    return await this.historyRepository.createHistory(createHistoryDto)
  }

  async findAll(historyFilter: FilterHistoryDto) {
    return await this.historyRepository.findAll(historyFilter)

  }
}
