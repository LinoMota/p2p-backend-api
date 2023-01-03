import { Middleware } from '@infra/http/definitions'
import { ErrorResponse } from '@presentation/util'
import { Request, Response, NextFunction } from 'express'

export const httpHeaderMiddlewareAdapter = (middleware: Middleware) => {
  return async (expressRequest: Request, expressResponse: Response, next: NextFunction) => {
    const request = {
      ...(expressRequest.headers || {}),
    }
    const middlewareResponse = await middleware.handle(request)

    const { code } = middlewareResponse

    if (middlewareResponse instanceof ErrorResponse) {
      expressResponse.status(code).json(middlewareResponse)
    }

    return next()
  }
}
