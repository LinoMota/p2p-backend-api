import { Inject, Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { PaginationFormat } from 'src/common/paginationFormat'
import { User } from './entities/user.entity'

@Injectable()
export class UserRepository {
  constructor(private readonly httpService: HttpService) {}

  async findUserByEmail(email: string) {
    const { data } = await this.httpService.get(`/user/findByEmail/${email}`)
    return data
  }

  async searchUserWallets(filters: any) {
    const { data } = await this.httpService.get(`/wallet/`, {
      params: filters,
    })
    return data
  }

  async searchUserStocks(filters: any) {
    const { data } = await this.httpService.get(`/stock/`, {
      params: filters,
    })
    return data
  }

  async getUserStockExplorer(userId: string, pagination: PaginationFormat) {
    const { data } = await this.httpService.get(`/stock/explorer`, {
      params: { userId, ...pagination },
    })
    return data
  }

  async findUserById(id: string) {
    const { data } = await this.httpService.get(`/user/${id}`)
    return data
  }

  async createUser(user: Partial<User>) {
    const { data } = await this.httpService.post(`/user`, user)
    return data
  }

  async updateUser(id: string, user: Partial<User>) {
    const { data } = await this.httpService.put(`/user/${id}`, user)
    return data
  }
}
