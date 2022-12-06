
import EmailExistsException from 'domain/exception/EmailExistsException'
import User from '@entities/User'

export default interface ICreateUser {
  create(data: User): Promise<User | EmailExistsException>
}
