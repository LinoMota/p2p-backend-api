import { httpServer } from './http/httpServer'

import './config/load-environment'
import './config/dependency-injection'

export const bootstrapper = async () => {
  httpServer()
}
