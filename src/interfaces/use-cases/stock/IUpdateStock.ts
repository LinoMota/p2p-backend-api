import CouldNotUpdateStockException from '@domain-exception/CouldNotUpdateStockException'
import Stock from '@entities/Stock'
import NoIdWasProvided from '@domain-exception/NoIdWasProvided'

export default interface IUpdateStock {
  update(data: Stock): Promise<Stock | CouldNotUpdateStockException | NoIdWasProvided>
}
