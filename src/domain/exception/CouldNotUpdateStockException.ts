import BaseError from '../../common/BaseError'

export default class CouldNotUpdateStockException extends BaseError {
  constructor() {
    super('CouldNotUpdateStockException: Could not update stock!', 500)
  }
}
