import BaseError from '../../common/BaseError'

export default class InvalidPasswordException extends BaseError {
  constructor() {
    super('InvalidPasswordException: Invalid authentication, wrong password!', 401)
  }
}
