
import EmailExistsException from 'domain/exception/EmailExistsException'
import User from '@entities/User'
import CouldNotCreateUserException from '@domain-exception/CouldNotCreateUserException'

export default interface ICreateUser {
  create(data: User): Promise<User | EmailExistsException | CouldNotCreateUserException>
}
