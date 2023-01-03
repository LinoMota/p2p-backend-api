import ICreateUserValidation from '@interfaces/validation/ICreateUserValidation'
import IUserRepository from '@irepositories/IUserRepository'
import User from '@entities/User'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateUserValidation implements ICreateUserValidation {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
  ) {}

  async emailExists(data: User): Promise<boolean> {
    let user
    try {
      user = await this.repository.findByEmail(data.email)
    } catch (error) {}

    return user !== undefined
  }
}

export default CreateUserValidation
