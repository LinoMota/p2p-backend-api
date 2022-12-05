import BaseError from '@common-exception/BaseError'

export class ErrorResponse {
  message: string
  code: number

  constructor(baseError: BaseError) {
    this.message = baseError.message
    this.code = baseError.code
  }
}
