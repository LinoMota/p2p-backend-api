import { ValidationResponse } from 'common/BaseValidator'
import BaseError from 'common/BaseError'

export default class InvalidPayloadException extends BaseError {
  constructor(validationError: ValidationResponse) {
    super('InvalidPayloadException: The given payload has invalid data.', 400)
    this.details = validationError.details
  }
}
