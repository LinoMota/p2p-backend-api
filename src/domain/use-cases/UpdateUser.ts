import { injectable, inject } from 'tsyringe'

import User from '@entities/User'
import IUserRepository from '@irepositories/IUserRepository'
import EmailExistsException from '../exception/EmailExistsException'
import IUpdateUser from '@interfaces/use-cases/IUpdateUser'
import CouldNotUpdateUserException from '@domain-exception/CouldNotUpdateUserException'
import UserDoesNotExistException from '@domain-exception/UserDoesNotExistException'

@injectable()
export default class UpdateUser implements IUpdateUser {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
  ) {}

  async update(data: Partial<User>): Promise<User | EmailExistsException | CouldNotUpdateUserException> {
    const userExists = await this.repository.findByEmail(data.email as string)

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
