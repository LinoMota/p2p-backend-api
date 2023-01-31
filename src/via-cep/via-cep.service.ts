import { Injectable } from '@nestjs/common'
import { HttpService } from 'nestjs-http-promise'
import { Address } from './entity/address.entity'

@Injectable()
export class ViaCepService {
  constructor(private readonly httpService: HttpService) {}

  async findCep(cep: string): Promise<Address> {
    const { data } = await this.httpService.get(`/${cep}/json`)
    return data
  }
}
