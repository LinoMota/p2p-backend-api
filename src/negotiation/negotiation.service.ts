import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { STATUS_CODES } from 'http'
import { CreateStockDto } from 'src/stock/dto/create-stock.dto'
import { UpdateStockDto } from 'src/stock/dto/update-stock.dto'
import { StockRepository } from 'src/stock/stock.repository'
import { CreateWalletDto } from 'src/wallet/dto/create-wallet.dto'
import { Wallet } from 'src/wallet/entities/wallet.entity'
import { WalletRepository } from 'src/wallet/wallet.repository'
import { CreateNegotiationDto } from './dto/create-negotiation.dto'
import { FinishNegotiaton } from './dto/finish-negotiation.dto'
import { NegotiationFilterDto } from './dto/negotiation-filter.dto'
import NegotiationRepository from './negotiation.repository'

@Injectable()
export class NegotiationService {
  constructor(
    private readonly negotiationRepository: NegotiationRepository,
    private readonly stockRepository: StockRepository,
    private readonly walletRepository: WalletRepository,
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

      await this.negotiationRepository.create(createNegotiationDto)
    } catch (error) {
      throw error
    }
  }

  async findAll(negotiationFilterDto: NegotiationFilterDto) {
    return this.negotiationRepository.find(negotiationFilterDto)
  }

  async update(id: string, negotiationFilterDto: NegotiationFilterDto) {
    return this.negotiationRepository.update(id, negotiationFilterDto)
  }

  async finish(id: string, finishDto: FinishNegotiaton) {
    try {
      throw new HttpException(
        'not_open_negotiation_stock',
        HttpStatus.BAD_REQUEST,
      )
      const currentNegotiationList: NegotiationFilterDto[] =
        await this.negotiationRepository.find({ id })

      if (currentNegotiationList.length == 0) {
        throw new BadRequestException({ message: 'not found negotiation' })
      }

      const currentNegotiation: NegotiationFilterDto = currentNegotiationList[0]

      if (finishDto.status == 'ACCEPTED') {
        const currentStock: CreateStockDto =
          await this.stockRepository.findStockById(
            currentNegotiation.requestedOrder,
          )

        if (currentStock.state != 'OPEN') {
          await this.negotiationRepository.update(currentNegotiation.id, {
            status: 'CANCELED',
          })
          throw new HttpException(
            'not_open_negotiation_stock',
            HttpStatus.BAD_REQUEST,
          )
        }
        const updateNegotiation = { status: 'ACCEPTED' }
        await this.negotiationRepository.update(
          currentNegotiation.id,
          updateNegotiation,
        )

        const updateStock: UpdateStockDto = { state: 'COMPLETED' }
        await this.stockRepository.updateStock(
          currentNegotiation.requestedOrder,
          updateStock,
        )

        if (currentStock.type == 'in') {
          const currentWallet: Wallet[] =
            await this.walletRepository.findWallet({
              linkedEntityId: currentStock.brandId,
              userId: currentStock.userId,
            })

          if (currentWallet.length == 1) {
            await this.walletRepository.updateWallet(currentWallet[0].id, {
              balance: currentWallet[0].balance + currentStock.quantity,
            })
          }
        }
      }

      // console.log('status', stock)
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} negotiation`
  }
}
