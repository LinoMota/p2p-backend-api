import { JwtModuleOptions } from '@nestjs/jwt'
import { environment } from './environment.config'

export const jwtConfig = (): JwtModuleOptions => {
  return {
    secret: environment().jwtSecretKey,
    signOptions: { expiresIn: environment().jwtExpiresIn },
  }
}
