import IJWTHelper, { JwtSettings } from '@interfaces/util/IJWTHelper'
import { container, injectable } from 'tsyringe'
import { Params } from 'express-jwt'
import jwt from 'jsonwebtoken'

@injectable()
export default class Jwt implements IJWTHelper {
  static jwtConfig: Params = {
    secret: process.env.JSON_WEB_TOKEN ?? 'default-secret-env',
    algorithms: ['HS256'],
  }

  decode(token: string) {
    return this.verify(token)
  }

  sign(data: any, options: JwtSettings): string {
    const secret: string = container.resolve('JSON_WEB_TOKEN_SECRET')

    return jwt.sign(data, secret, {
      ...options,
      algorithm: 'HS256',
    })
  }

  verify(token: string): any {
    try {
      const secret: string = container.resolve('JSON_WEB_TOKEN_SECRET')

      return jwt.verify(token.replace('Bearer ', ''), secret, {
        algorithms: ['HS256'],
      })
    } catch (e) {
      return undefined
    }
  }
}
