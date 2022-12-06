import { ErrorResponse, SucessfulResponse } from '@presentation/util'

export interface Middleware {
  handle(request: object): SucessfulResponse | ErrorResponse | Promise<SucessfulResponse | ErrorResponse>
}
