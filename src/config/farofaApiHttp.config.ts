import { HttpModuleOptionsFactory } from 'nestjs-http-promise'

export class FarofaApiHttpConfig implements HttpModuleOptionsFactory {
  createHttpOptions() {
    return {
      timeout: 5000,
      baseURL: 'http://localhost:4000',
    }
  }
}
