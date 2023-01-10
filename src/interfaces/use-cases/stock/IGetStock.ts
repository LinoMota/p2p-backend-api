import InvalidJWTTokenException from '@domain-exception/InvalidJWTTokenException'
import Stock from '@entities/Stock'

export default interface IGetStock {
  findUserStocks(token: string): Promise<Partial<Stock[]> | undefined | InvalidJWTTokenException>
}
