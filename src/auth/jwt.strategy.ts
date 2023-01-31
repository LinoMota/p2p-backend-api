import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { environment } from 'src/config/environment.config'
import { AuthService } from './auth.service'

type UserLogin = {
  email: string
  password: string
  id: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment().jwtSecretKey,
    })
  }

  async validate(userLogin: UserLogin) {
    // const { email } = userLogin
    // const user = await this.authService.verifyExistence(email)

    // if (!user) {
    //   throw new UnauthorizedException()
    // }
    return userLogin
  }
}
