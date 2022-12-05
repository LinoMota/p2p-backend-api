import { Response } from '../definitions/Response'

export const ok = (body: object = {}): Response => ({
  statusCode: 200,
  body,
})

export const badRequest = (body: object): Response => ({
  statusCode: 400,
  body,
})

export const forbidden = (body: object): Response => ({
  statusCode: 403,
  body,
})

export const unauthorized = (body: object): Response => ({
  statusCode: 401,
  body,
})
