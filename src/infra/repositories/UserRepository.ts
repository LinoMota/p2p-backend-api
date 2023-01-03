import User from '@entities/User'
import FarofaApiClient from '@infra/client/FarofaApiClient'
import IUserRepository from '@irepositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    @inject('FarofaApiClient')
    private readonly farofaApiClient: FarofaApiClient,
  ) {}

  async updateUser (id: string, data: User): Promise<User | undefined> {
    let response

    try {
      response = await this.farofaApiClient.updateUser(id, data)
    } catch (error) {
      console.log(error)
    }

    return response as unknown as User
  }

  async createUser(user: User): Promise<User> {
    let response

    try {
      response = await this.farofaApiClient.createUser(user)
    } catch (error) {
      console.log(error)
    }

    return response as unknown as User
  }

  async findByEmail(email: string): Promise<User | undefined> {
    let response

    try {
      response = await this.farofaApiClient.getUserByEmail(email) as unknown as User
    } catch (error) {
      console.log(error)
    }

    return response as User
  }
}
