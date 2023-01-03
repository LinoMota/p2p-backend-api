import axios, { AxiosInstance } from 'axios'

export default abstract class BaseHttpClient {
  private instance: AxiosInstance

  constructor(baseUrl: string, config: object) {
    this.instance = axios.create({
      baseURL: baseUrl,
      ...config,
    })
  }

  public async get(url: string): Promise<Object | undefined> {
    const response = await axios.get(`${url}`)
    return response.data
  }

  public async post(url: string, data: Object): Promise<Object | undefined> {
    const response = await axios.post(`${url}`, data)
    return response.data
  }

  public async put(url: string, data: Object): Promise<Object | undefined> {
    const response = await axios.put(`${url}`, data)
    return response.data
  }

  public async delete(url: string): Promise<Object | undefined> {
    const response = await axios.delete(`${url}`)
    return response.data
  }
}
