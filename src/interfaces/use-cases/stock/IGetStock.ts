import Stock from '@entities/Stock'

export default interface IGetStock {
  findUserStocks(id: string): Promise<Partial<Stock[]> | undefined>
}
