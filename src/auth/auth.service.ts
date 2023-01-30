import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    let user = undefined

    try {
      user = await this.userService.findUserByEmail(email)
    } catch (error) {
      throw new NotFoundException('User not found')
    }

    const validatedUser = await this.validateUser(email, password, user)

    if (!validatedUser) {
      throw new UnauthorizedException('Invalid password')
    }

    return {
      access_token: this.jwtService.sign(validatedUser),
    }
  }

  async validateUser(email: string, pass: string, passedUser: any = undefined) {
    const user =
      passedUser === undefined
        ? await this.userService.findUserByEmail(email)
        : passedUser

    if (user && user.password === pass) {
      delete user.password
      return user
    }
    return null
  }

  async verifyExistence(email: string) {
    try {
      const user = await this.userService.findUserByEmail(email)
      delete user.password
      return user
    } catch (error) {}
    return null
  }
}
