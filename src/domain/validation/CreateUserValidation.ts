import ICreateUserValidator from 'interfaces/validation/ICreateUserValidator'
import IUserRepository from '@irepositories/IUserRepository'
import User from '@entities/User'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateUserValidation implements ICreateUserValidator {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
  ) {}

  emailExists(data: User): boolean | Promise<boolean> {
    const user = this.repository.findByEmail(data.email)
    return user !== undefined
  }
}

export default CreateUserValidation
