import { injectable, inject } from 'tsyringe'

import Stock from '@entities/Stock'
import IStockRepository from '@irepositories/IStockRepository'
import NoIdWasProvided from '@domain-exception/NoIdWasProvided'
import IUpdateStock from '@interfaces/use-cases/stock/IUpdateStock'
import StockDoesNotExistException from '@domain-exception/StockDoesNotExistException'
import CouldNotUpdateStockException from '@domain-exception/CouldNotUpdateStockException'

@injectable()
export default class UpdateStock implements IUpdateStock {
  constructor(
    @inject('IStockRepository')
    private readonly repository: IStockRepository,
  ) {}

  async update(data: Stock): Promise<Stock | CouldNotUpdateStockException | NoIdWasProvided> {
    const StockExists = await this.repository.findStockById(data.id as string)

    if (!StockExists) return new StockDoesNotExistException()

    const updatedStock = {
      ...StockExists,
      ...(data as Stock),
    }

    const persistedStock = await this.repository.updateStock(StockExists.id as string, updatedStock)

    if (persistedStock === undefined) {
      return new CouldNotUpdateStockException()
    }

    return persistedStock as unknown as Stock
  }
}
