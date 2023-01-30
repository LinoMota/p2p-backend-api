import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { HttpModule } from 'nestjs-http-promise'
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config'
import { AuthModule } from 'src/auth/auth.module'
import { UserRepository } from './user.repository'

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: FarofaApiHttpConfig }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
