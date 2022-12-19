import UserDoesNotExistException from '@domain-exception/UserDoesNotExistException'
import User from '@entities/User'

export default interface IGetUser {
  getUser(token: string): Promise<Partial<User> | UserDoesNotExistException>
}
