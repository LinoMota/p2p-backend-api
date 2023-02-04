import { AuthService } from './../auth/auth.service'
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto'
import { LoginUserBrandDto } from 'src/user-brand/dto/login-user-brand.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Post('authenticate')
  authenticate(@Body() body: LoginUserDto) {
    const { email, password } = body

    return this.authService.login(email, password)
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('login-brand')
  loginBrand(@Body() body: LoginUserBrandDto) {
    const { cpf, password, brandId, userId } = body

    return this.authService.loginBrand(cpf, password, brandId, userId)
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    const { email } = req.user
    const user = this.userService.findUserByEmail(email, true)
    return user
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('stocks')
  myStocks(@Request() req) {
    const { id } = req.user
    return this.userService.findUserStocks(id)
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('wallets')
  myWallets(@Request() req) {
    const { id } = req.user
    return this.userService.findUserWallets(id)
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('stocksExplorer')
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  stocksExplorer(
    @Request() req,
    @Query('limit') limit = 10,
    @Query('page') page = 1,
  ) {
    const { id } = req.user
    return this.userService.stockExplorer(id, { limit, page })
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }
}
