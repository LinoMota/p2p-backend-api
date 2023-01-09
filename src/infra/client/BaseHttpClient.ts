import axios, { AxiosInstance } from 'axios'

export default abstract class BaseHttpClient {
  private instance: AxiosInstance

  constructor(baseUrl: string, config: object) {
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      ...config,
    })
  }

  public async get(url: string): Promise<Object | undefined> {
    const response = await this.instance.get(`${url}`)
    return response.data
  }

  public async post(url: string, data: Object): Promise<Object | undefined> {
    const response = await this.instance.post(`${url}`, data)
    return response.data
  }

  public async put(url: string, data: Object): Promise<Object | undefined> {
    const response = await this.instance.put(`${url}`, data)
    return response.data
  }

  public async delete(url: string): Promise<Object | undefined> {
    const response = await this.instance.delete(`${url}`)
    return response.data
  }
}
