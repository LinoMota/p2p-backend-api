import { injectable, inject } from 'tsyringe'
import Brand from '@entities/Brand'
import IBrandRepository from '@interfaces/repositories/IBrandRepostiory'
import IGetBrand from '@interfaces/use-cases/brand/IGetBrand'

@injectable()
export default class GetBrand implements IGetBrand {
  constructor(
    @inject('IBrandRepository')
    private readonly repository: IBrandRepository,
  ) {}

  async getAll(): Promise<Brand[] | undefined> {
    return await this.repository.getAll()
  }
}
