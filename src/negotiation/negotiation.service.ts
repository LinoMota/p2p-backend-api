import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateHistoryDto } from 'src/history/dto/create-history.dto'
import { HistoryRepository } from 'src/history/history.repository'
import { CreateStockDto } from 'src/stock/dto/create-stock.dto'
import { UpdateStockDto } from 'src/stock/dto/update-stock.dto'
import { StockRepository } from 'src/stock/stock.repository'
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
    private readonly history: HistoryRepository,
  ) {}

  async create(createNegotiationDto: CreateNegotiationDto) {
    try {
      const currentOrder = await this.stockRepository.findStockById(
        createNegotiationDto.requestedOrder,
      )
      if (currentOrder.state != 'OPEN') {
        throw new BadRequestException({
          message: 'stock not support negotiation',
        })
      }

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
      const currentNegotiationList: NegotiationFilterDto[] =
        await this.negotiationRepository.find({ _id: id })

      if (currentNegotiationList.length == 0) {
        throw new BadRequestException({ message: 'not found negotiation' })
      }

      const currentNegotiation: NegotiationFilterDto = currentNegotiationList[0]

      const currentStock: CreateStockDto =
        await this.stockRepository.findStockById(
          currentNegotiation.requestedOrder,
        )
      if (finishDto.status == 'ACCEPTED') {
        // if (currentStock.state != 'OPEN') {
        //   await this.negotiationRepository.update(currentNegotiation.id, {
        //     status: 'CANCELED',
        //   })
        //   throw new HttpException(
        //     'not_open_negotiation_stock',
        //     HttpStatus.BAD_REQUEST,
        //   )
        // }
        const updateNegotiation = { status: 'ACCEPTED' }
        // await this.negotiationRepository.update(
        //   currentNegotiation.id,
        //   updateNegotiation,
        // )

        const updateStock: UpdateStockDto = { state: 'COMPLETED' }
        // await this.stockRepository.updateStock(
        //   currentNegotiation.requestedOrder,
        //   updateStock,
        // )
        const currentWallet: Wallet[] = await this.walletRepository.findWallet({
          linkedEntityId: currentStock.brandId,
          userId: currentStock.userId,
        })

        const userOfferWallet: Wallet[] =
          await this.walletRepository.findWallet({
            linkedEntityId: currentStock.brandId,
            userId: currentNegotiation.userNegociating,
          })
        const historyItem: CreateHistoryDto = {
          userId: currentStock.userId,
          value: currentNegotiation.value,
          quantity: currentStock.quantity,
          type: currentStock.type,
          paymentMethod: currentStock.paymentMethod,
          brandId: currentStock.brandId,
        }
        if (currentStock.type == 'in') {
          if (currentWallet.length == 1) {
            if (userOfferWallet.length == 1) {
              if (userOfferWallet[0].balance - currentStock.quantity <= 0) {
                throw new HttpException('not_balance', HttpStatus.BAD_REQUEST)
              }
              await this.walletRepository.updateWallet(userOfferWallet[0].id, {
                balance: userOfferWallet[0].balance - currentStock.quantity,
              })
              await this.walletRepository.updateWallet(currentWallet[0].id, {
                balance: currentWallet[0].balance + currentStock.quantity,
              })
            }
            await this.history.createHistory(historyItem)

            return 'ok'
          }
        } else {
          if (userOfferWallet.length == 1) {
            await this.history.createHistory(historyItem)

            return await this.walletRepository.updateWallet(
              userOfferWallet[0].id,
              {
                balance: userOfferWallet[0].balance + currentStock.quantity,
              },
            )
          }
        }
      }

      if (finishDto.status == 'DECLINED') {
        await this.negotiationRepository.update(currentNegotiation.id, {
          status: 'DECLINED',
        })
      }

      // console.log('status', stock)
    } catch (error) {
      throw error
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} negotiation`
  }
}
