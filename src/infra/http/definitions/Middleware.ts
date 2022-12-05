import { Request } from './Request'
import { Response } from './Response'

export interface Middleware {
  handle(request: Request): Promise<Response>
}
