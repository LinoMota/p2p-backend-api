import { injectable, inject } from 'tsyringe'
import IGetStock from '@interfaces/use-cases/stock/IGetStock'
import Stock from '@entities/Stock'
import IStockRepository from '@interfaces/repositories/IStockRepository'
import IJWTHelper from '@interfaces/util/IJWTHelper'
import User from '@entities/User'
import InvalidJWTTokenException from '@domain-exception/InvalidJWTTokenException'

@injectable()
export default class GetStock implements IGetStock {
  constructor(
    @inject('IStockRepository')
    private readonly repository: IStockRepository,
    @inject('IJWTHelper')
    private readonly jwt: IJWTHelper,
  ) {}

  async findAllUsersStocks (token: string): Promise<(Stock | undefined)[] | InvalidJWTTokenException | undefined> {
    const data = this.jwt.decode(token) as User

    if (!data) return new InvalidJWTTokenException()

    return await this.repository.getAllUsersStocks(data.id as string)
  }

  async findUserStocks(token: string): Promise<Stock[] | undefined | InvalidJWTTokenException> {
    const data = this.jwt.decode(token) as User

    if (!data) return new InvalidJWTTokenException()

    return await this.repository.getUserStocks(data.id as string)
  }
}
