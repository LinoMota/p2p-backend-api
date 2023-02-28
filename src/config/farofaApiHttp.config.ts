import { HttpModuleOptionsFactory } from 'nestjs-http-promise'
import { environment } from './environment.config'

export class FarofaApiHttpConfig implements HttpModuleOptionsFactory {
  createHttpOptions() {
    return {
      timeout: 15000,
      baseURL: environment().farofaApiUrl,
    }
  }
}
