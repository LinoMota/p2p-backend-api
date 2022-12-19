import User from '@entities/User'

export default interface ICreateUserValidation {
  emailExists(data: Partial<User>): Promise<boolean>
}
