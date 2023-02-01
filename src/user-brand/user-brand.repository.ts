import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'

@Injectable()
export class UserBrandRepository {
  constructor(private readonly httpService: HttpService) {}

  async login(cpf: string, password: string, brandId: string) {
    const { data } = await this.httpService.post(`/brand/login/${brandId}`, {
      cpf,
      password,
    })
    return data
  }
}
