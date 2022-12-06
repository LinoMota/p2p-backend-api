import BaseError from '../../common/BaseError'

export default class EmailExistsException extends BaseError {
  constructor() {
    super('EmailExistsException: Invalid user creation, email already exists!', 400)
  }
}
