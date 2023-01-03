import CouldNotUpdateUserException from '@domain-exception/CouldNotUpdateUserException'
import EmailExistsException from 'domain/exception/EmailExistsException'
import User from '@entities/User'
import NoIdWasProvided from '@domain-exception/NoIdWasProvided'

export default interface IUpdateUser {
  update(data: User): Promise<User | EmailExistsException | CouldNotUpdateUserException | NoIdWasProvided>
}
