import BaseError from '../../common/BaseError'

export default class UserDoesNotExistException extends BaseError {
  constructor() {
    super('UserDoesNotExistException: Invalid authentication, there is no user with the given email!', 404)
  }
}
