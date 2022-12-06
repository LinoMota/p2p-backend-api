import { Controller } from '@infra/http/definitions'
import { ErrorResponse, SucessfulResponse } from '@presentation/util'
import { Request, Response } from 'express'

export const httpRouterAdapter = (controller: Controller) => {
  return async (expressRequest: Request, expressResponse: Response) => {
    const request = {
      ...(expressRequest.body || {}),
      ...(expressRequest.params || {}),
      ...(expressRequest.query || {}),
    }
    const endpointResponse = await controller.handle(request)

    const { code } = endpointResponse

    if (endpointResponse instanceof ErrorResponse) {
      expressResponse.status(code).json(endpointResponse)
    }

    if (endpointResponse instanceof SucessfulResponse) {
      expressResponse.status(code).json(endpointResponse.data)
    }
  }
}
