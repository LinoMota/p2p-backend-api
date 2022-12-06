import User from '@entities/User'
import IUserRepository from '@irepositories/IUserRepository'
import { injectable } from 'tsyringe'

const userDb: User[] = []

@injectable()
export default class UserRepository implements IUserRepository {
  createUser(user: User): User {
    const id = (userDb.length + 1).toString()
    userDb.push({ ...user, id })
    return { ...user, id }
  }

  findByEmail(email: string): User | undefined {
    return userDb.find((user) => user.email === email)
  }
}
