import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { PaginationFormat } from 'src/common/paginationFormat'
import { WalletFilterDto } from './dto/wallet-filter.dto'
import { Wallet } from './entities/wallet.entity'

@Injectable()
export class WalletRepository {
  constructor(private readonly httpService: HttpService) { }

  async find(pagination: PaginationFormat = new PaginationFormat()) {
    const { data } = await this.httpService.get(`/wallet/`, {
      params: pagination,
    })
    return data
  }

  async findWalletById(id: string) {
    const { data } = await this.httpService.get(`/wallet/${id}`)
    return data
  }

  async findWallet(walletFilterDto: WalletFilterDto) {
    const { data } = await this.httpService.get('/wallet', {
      params: walletFilterDto
    })
    return data
  }

  async createWallet(wallet: Partial<Wallet>) {
    const { data } = await this.httpService.post('/wallet', wallet)
    return data
  }

  async updateWallet(id: string, wallet: Partial<Wallet>) {
    const { data } = await this.httpService.put(`/wallet/${id}`, wallet)
    return data
  }

  async deleteWallet(id: string) {
    const { data } = await this.httpService.delete(`/wallet/${id}`)
    return data
  }
}
