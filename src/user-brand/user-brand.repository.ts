import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { UserBrand } from './entities/user-brand.entity'

@Injectable()
export class UserBrandRepository {
  constructor(private readonly httpService: HttpService) { }

  async login(cpf: string): Promise<UserBrand[]> {
    const { data } = await this.httpService.get(`/user-brand/${cpf}`)
    return data
  }
}
