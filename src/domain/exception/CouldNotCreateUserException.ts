import BaseError from '../../common/BaseError'

export default class CouldNotCreateUserException extends BaseError {
  constructor() {
    super('CouldNotCreateUserException: User was not created!', 500)
  }
}
