import { Middleware } from '@infra/http/definitions'
import InvalidPayloadException from '@infra/http/exceptions/InvalidPayloadException'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import BaseValidator, { ValidationResponse } from 'common/BaseValidator'
import Joi from 'joi'

export namespace JoiValidatorNamespace {
  export type Request = {
    [key: string]: any
  }
}

export default class JoiValidator implements Middleware, BaseValidator {
  schema: Joi.Schema

  constructor(schema: Joi.Schema) {
    this.validate = this.validate.bind(this)
    this.handle = this.handle.bind(this)
    this.schema = schema
  }

  validate(data: any): ValidationResponse {
    const validation = this.schema.validate(data)
    const { error } = validation
    return {
      isValid: !error,
      details: validation,
    }
  }

  handle(
    request: JoiValidatorNamespace.Request,
  ): SucessfulResponse | ErrorResponse | Promise<SucessfulResponse | ErrorResponse> {
    const validation = this.validate(request)

    if (validation.isValid) return new SucessfulResponse(request)

    return new ErrorResponse(new InvalidPayloadException(validation))
  }
}
