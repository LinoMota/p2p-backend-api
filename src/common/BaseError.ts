export default abstract class BaseError extends Error {
  code: number
  details: any
  constructor(message: string, code: number, details?: any) {
    super(message)
    this.code = code
    this.details = details
  }
}
