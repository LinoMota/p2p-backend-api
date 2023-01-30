import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PaginationFormat } from 'src/common/paginationFormat'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByEmail(email: string, removePassword = false): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email)

    if (removePassword) {
      delete user.password
    }

    return user
  }

  async findUserWallets(userId: string) {
    return await this.userRepository.searchUserWallets({ userId })
  }

  async findUserStocks(userId: string) {
    return await this.userRepository.searchUserStocks({ userId })
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto

    try {
      const user = await this.userRepository.findUserByEmail(email)

      if (user) {
        throw new BadRequestException('User already exists')
      }
    } catch (error) {}

    return await this.userRepository.createUser(createUserDto)
  }

  async findOne(id: string) {
    let user = undefined
    try {
      user = await this.userRepository.findUserById(id)
    } catch (error) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.findOne(id)

    user = { ...user, ...updateUserDto }

    let updatedUser = undefined

    try {
      updatedUser = await this.userRepository.updateUser(id, user)
    } catch (error) {
      const reason = error.response?.data?.message as string[]
      const message = 'User not updated'

      throw new BadRequestException(
        reason ? `${message}: ${reason.join(', ')}` : message,
      )
    }

    return updatedUser
  }

  async stockExplorer(userId: string, pagination: PaginationFormat) {
    return await this.userRepository.getUserStockExplorer(userId, pagination)
  }
}
