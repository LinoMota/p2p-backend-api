import Brand from '@entities/Brand'
import FarofaApiClient from '@infra/client/FarofaApiClient'
import IBrandRepository from '@irepositories/IBrandRepostiory'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class BrandRepository implements IBrandRepository {
  constructor(
    @inject('FarofaApiClient')
    private readonly farofaApiClient: FarofaApiClient,
  ) {}

  async getAll(): Promise<Brand[] | undefined> {
    let response

    try {
      response = (await this.farofaApiClient.get('/brand')) as unknown as Brand[]
    } catch (error) {
      console.log(error)
    }

    return response as Brand[]
  }
}
