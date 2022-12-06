export interface ValidationResponse {
  isValid: boolean
  details: any
}

export default interface BaseValidator {
  validate(data: any, schemaObject: any): ValidationResponse | Promise<ValidationResponse>
}
