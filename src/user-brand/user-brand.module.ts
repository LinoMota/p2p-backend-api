import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-http-promise/dist/http.module';
import { AuthModule } from 'src/auth/auth.module';
import { FarofaApiHttpConfig } from 'src/config/farofaApiHttp.config';
import { UserBrandController } from './user-brand.controller';
import { UserBrandRepository } from './user-brand.repository';
import { UserBrandService } from './user-brand.service';

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: FarofaApiHttpConfig }),
    forwardRef(() => AuthModule),
  ],

  controllers: [UserBrandController],
  providers: [UserBrandService, UserBrandRepository],
  exports: [UserBrandService, UserBrandRepository],
})
export class UserBrandModule {}
