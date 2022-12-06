import { ErrorResponse, SucessfulResponse } from '@presentation/util'

export interface Controller {
  handle(request: object): Promise<SucessfulResponse | ErrorResponse>
}
