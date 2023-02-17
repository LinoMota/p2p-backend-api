import { BadRequestException, Injectable } from '@nestjs/common'
import { StockRepository } from 'src/stock/stock.repository'
import { CreateNegotiationDto } from './dto/create-negotiation.dto'
import { NegotiationFilterDto } from './dto/negotiation-filter.dto'
import NegotiationRepository from './negotiation.repository'

@Injectable()
export class NegotiationService {
  constructor(
    private readonly negotiationRepository: NegotiationRepository,
    private readonly stockRepository: StockRepository,
  ) { }

  async create(createNegotiationDto: Partial<CreateNegotiationDto>) {
    try {
      const currentOrder = await this.stockRepository.findStockById(
        createNegotiationDto.requestedOrder,
      )
      // if (currentOrder.state != 'OPEN') {
      //   throw new BadRequestException({
      //     message: 'stock not support negotiation',
      //   })
      // }
      await this.stockRepository.updateStock(
        createNegotiationDto.requestedOrder,
        { ...currentOrder, state: 'NEGOTIATION' },
      )

      console.log('createNegotiationDto', createNegotiationDto)

      await this.negotiationRepository.create(createNegotiationDto)
    } catch (error) {
      throw error
    }
  }

  async findAll(negotiationFilterDto: NegotiationFilterDto) {
    return this.negotiationRepository.find(negotiationFilterDto)
  }

  findOne(id: string) {
    return `This action returns a #${id} negotiation`
  }
}
