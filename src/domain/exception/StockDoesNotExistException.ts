import BaseError from '../../common/BaseError'

export default class StockDoesNotExistException extends BaseError {
  constructor() {
    super('StockDoesNotExistException: Stock does not exist!', 404)
  }
}
