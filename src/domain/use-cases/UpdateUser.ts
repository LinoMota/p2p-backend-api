import { injectable, inject } from 'tsyringe'

import User from '@entities/User'
import IUserRepository from '@irepositories/IUserRepository'
import EmailExistsException from '../exception/EmailExistsException'
import IUpdateUser from '@interfaces/use-cases/IUpdateUser'
import CouldNotUpdateUserException from '@domain-exception/CouldNotUpdateUserException'
import UserDoesNotExistException from '@domain-exception/UserDoesNotExistException'
import InvalidJWTTokenException from '@domain-exception/InvalidJWTTokenException'
import IJWTHelper from '@interfaces/util/IJWTHelper'

@injectable()
export default class UpdateUser implements IUpdateUser {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
    @inject('IJWTHelper')
    private readonly jwt: IJWTHelper,
  ) {}

  async update(data: Partial<User>): Promise<User | EmailExistsException | CouldNotUpdateUserException> {
    // @ts-ignore
    const diek = this.jwt.decode(data.authorization)

    if (!diek) return new InvalidJWTTokenException()

    const userExists = await this.repository.findByEmail(diek.email as string)

    if (!userExists) return new UserDoesNotExistException()

    const updatedUser = {
      ...userExists,
      ...(data as User),
    }

    const persistedUser = await this.repository.updateUser(userExists.id as string, updatedUser)

    if (persistedUser === undefined) {
      return new CouldNotUpdateUserException()
    }

    return persistedUser as unknown as User
  }
}
