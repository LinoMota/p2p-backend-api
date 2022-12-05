import { httpServer } from './http/httpServer'
import dotenv from 'dotenv'

import './config/dependency-injection'

export const bootstrapper = async () => {
  dotenv.config()
  httpServer()
}
