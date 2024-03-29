import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { LoginUserBrandDto } from './dto/login-user-brand.dto'
import { UserBrandService } from './user-brand.service'

@ApiTags('userbrand')
@ApiBearerAuth('access-token')
@Controller('user-brand')
export class UserBrandController {
  constructor(private readonly userBrandService: UserBrandService) { }

  @UseGuards(JwtAuthGuard)
  @Post('authenticate')
  async authenticate(@Body() body: LoginUserBrandDto) {
    const { cpf, password, brandId, userId } = body

    try {
      return await this.userBrandService.login(cpf, password, brandId, userId)
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }
}
