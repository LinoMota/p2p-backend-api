import BaseError from '../../common/BaseError'

export default class InvalidJWTTokenException extends BaseError {
  constructor() {
    super('InvalidJWTTokenException: Invalid JWT token!', 401)
  }
}
