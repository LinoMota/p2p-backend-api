import BaseError from '../../common/BaseError'

export default class CouldNotUpdateUserException extends BaseError {
  constructor() {
    super('CouldNotUpdateUserException: Could not update user!', 500)
  }
}
