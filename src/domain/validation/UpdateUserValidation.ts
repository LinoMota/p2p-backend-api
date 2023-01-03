import IUserRepository from '@irepositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import IUpdateUserValidation from '@interfaces/validation/IUpdateUserValidation'

@injectable()
class UpdateUserValidation implements IUpdateUserValidation {
  constructor(
    @inject('IUserRepository')
    private readonly repository: IUserRepository,
  ) {}

  async userExists(id: string): Promise<boolean> {
    let user
    try {
      user = await this.repository.findByEmail(id)
    } catch (error) {}
    return user !== undefined
  }
}

export default UpdateUserValidation
