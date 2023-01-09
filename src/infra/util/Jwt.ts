import IJWTHelper, { JwtSettings } from '@interfaces/util/IJWTHelper'
import { container, inject, injectable } from 'tsyringe'
import { Params } from 'express-jwt'
import jwt from 'jsonwebtoken'

@injectable()
export default class Jwt implements IJWTHelper {
  constructor(
    @inject('JSON_WEB_TOKEN_SECRET')
    public secret: string,
  ) {
    this.secret = secret
  }

  static jwtConfig : Params = {
    secret: container.resolve('JSON_WEB_TOKEN_SECRET'),
    algorithms: ['HS256'],
  }

  decode(token: string) {
    return this.verify(token)
  }

  sign(data: any, options: JwtSettings): string {
    return jwt.sign(data, this.secret, {
      ...options,
      algorithm: 'HS256',
    })
  }

  verify(token: string): any {
    try {
      return jwt.verify(token.replace('Bearer ', ''), this.secret, {
        algorithms: ['HS256'],
      })
    } catch (e) {
      return undefined
    }
  }
}
