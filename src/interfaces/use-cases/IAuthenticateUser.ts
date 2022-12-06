import User from '@entities/User'

export default interface IAuthenticateUser {
  authenticate(data: User): Promise<User>
  validateToken(token: string): boolean
}
