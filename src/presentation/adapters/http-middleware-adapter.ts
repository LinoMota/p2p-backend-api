import { Middleware } from '@infra/http/definitions'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import { Request, Response, NextFunction } from 'express'

export const httpMiddlewareAdapter = (middleware: Middleware) => {
  return async (expressRequest: Request, expressResponse: Response, next: NextFunction) => {
    const request = {
      ...(expressRequest.body || {}),
      ...(expressRequest.params || {}),
      ...(expressRequest.query || {}),
    }
    const middlewareResponse = await middleware.handle(request)

    const { code } = middlewareResponse

    if (middlewareResponse instanceof ErrorResponse) {
      expressResponse.status(code).json(middlewareResponse)
    }

    if (middlewareResponse instanceof SucessfulResponse) {
      return next()
    }
  }
}
