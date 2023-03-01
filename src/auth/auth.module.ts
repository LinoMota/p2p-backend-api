import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from 'src/config/jwt.config'
import { UserService } from 'src/user/user.service'
import { UserBrandModule } from 'src/user-brand/user-brand.module'

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => UserBrandModule),

    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register(jwtConfig()),
  ],
  providers: [JwtStrategy, AuthService, UserService],
  exports: [PassportModule, AuthService],
})
export class AuthModule { }
