import { HttpModuleOptionsFactory } from 'nestjs-http-promise'
import { environment } from './environment.config'

export class ViaCepApiHttpConfig implements HttpModuleOptionsFactory {
  createHttpOptions() {
    return {
      timeout: 5000,
      baseURL: environment().viaCepBaseUrl,
    }
  }
}
