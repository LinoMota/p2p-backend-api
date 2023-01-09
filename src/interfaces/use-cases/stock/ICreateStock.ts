
import EmailExistsException from 'domain/exception/EmailExistsException'
import Stock from '@entities/Stock'
import CouldNotCreateStockException from '@domain-exception/CouldNotCreateStockException'

export default interface ICreateStock {
  create(data: Partial<Stock>): Promise<Stock | EmailExistsException | CouldNotCreateStockException>
}
