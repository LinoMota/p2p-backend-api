import { Response } from '../definitions/Response'

export const ok = (body: object = {}): Response => ({
  code: 200,
  body,
})

export const badRequest = (body: object): Response => ({
  code: 400,
  body,
})

export const forbidden = (body: object): Response => ({
  code: 403,
  body,
})

export const unauthorized = (body: object): Response => ({
  code: 401,
  body,
})
