import InvalidPasswordException from '@domain-exception/InvalidPasswordException'
import UserDoesNotExistException from '@domain-exception/UserDoesNotExistException'
import User from '@entities/User'
import { jwtToken } from '@interfaces/util/IJWTHelper'
export default interface IAuthenticateUser {
  authenticate(data: User): jwtToken | Promise<jwtToken> | UserDoesNotExistException | InvalidPasswordException
  validateToken(token: string): boolean
}
