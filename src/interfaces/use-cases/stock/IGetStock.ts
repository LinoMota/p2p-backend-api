import InvalidJWTTokenException from '@domain-exception/InvalidJWTTokenException'
import Stock from '@entities/Stock'

export default interface IGetStock {
  findOne(token: string, stockId: string): Promise<Partial<Stock> | undefined | InvalidJWTTokenException>
  findUserStocks(token: string): Promise<Partial<Stock[]> | undefined | InvalidJWTTokenException>
  findAllUsersStocks(token: string): Promise<Partial<Stock[]> | undefined | InvalidJWTTokenException>
}
