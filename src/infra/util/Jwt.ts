import IJWTHelper, { JwtSettings } from '@interfaces/util/IJWTHelper'
import { inject, injectable } from 'tsyringe'
import jwt from 'jsonwebtoken'

@injectable()
export default class Jwt implements IJWTHelper {
  constructor(
    @inject('JSON_WEB_TOKEN_SECRET')
    public secret: string,
  ) {
    this.secret = secret
  }

  decode (token: string) {
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
      return jwt.verify(token, this.secret, {
        algorithms: ['HS256'],
      })
    } catch (e) {
      return undefined
    }
  }
}
