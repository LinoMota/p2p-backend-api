// import ErrorResponse from '@/controllers/responses/ErrorResponse'
import SucessfulResponse from '@/controllers/responses/SucessfulResponse'

export interface Controller {
  handle(request: object): Promise<SucessfulResponse>
}
