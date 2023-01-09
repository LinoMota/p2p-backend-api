import BaseError from '../../common/BaseError'

export default class CouldNotCreateStockException extends BaseError {
  constructor() {
    super('CouldNotCreateStockException: Stock was not created!', 500)
  }
}
