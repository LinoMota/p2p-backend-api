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

  sign(data: any, options: JwtSettings): string {
    return jwt.sign(data, this.secret, options)
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.secret)
    } catch (e) {
      return undefined
    }
  }
}
