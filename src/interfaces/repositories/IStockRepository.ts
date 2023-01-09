import Stock from '@entities/Stock'

export default interface IStockRepository {
  findStockById(id: string): Promise<Stock | undefined>
  createStock(data: Stock): Promise<Stock | undefined>
  updateStock(id: string, data: Stock): Promise<Stock | undefined>
  getUserStocks(id : String): Promise<Stock[] | undefined>
}
