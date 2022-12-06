import BaseError from 'common/BaseError'

export class ErrorResponse {
  message: string
  code: number
  details: any

  constructor(baseError: BaseError) {
    this.message = baseError.message
    this.code = baseError.code
    this.details = baseError.details
  }
}
