import User from '@entities/User'
import { inject, injectable } from 'tsyringe'
import BaseHttpClient from './BaseHttpClient'

@injectable()
export default class FarofaApiClient extends BaseHttpClient {
  constructor(
    @inject('FAROFA_API_URL')
    private readonly baseUrl: string,
  ) {
    super(baseUrl, {})
  }

  public async createUser(user: Partial<User>): Promise<Object | undefined> {
    const response = await this.post(`${this.baseUrl}/user`, user)
    return response
  }

  public async getUserByEmail(email: string): Promise<Object | undefined> {
    const response = await this.get(`${this.baseUrl}/user/findByEmail/${email}`)
    return response
  }
}
