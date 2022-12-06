import User from '@entities/User'

export default interface IUserRepository {
  createUser(newUser: User): User
  findByEmail(email: string): User | undefined
}
