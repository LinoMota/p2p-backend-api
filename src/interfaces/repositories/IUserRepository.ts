import User from '@entities/User'

export default interface IUserRepository {
  createUser(newUser: User): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
}
