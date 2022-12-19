import IPasswordEncryption from 'interfaces/util/IPasswordEncryption'
import { injectable } from 'tsyringe'

@injectable()
export default class PasswordEncryption implements IPasswordEncryption {
  encrypt(password: string): string {
    return password.split('').reverse().join('')
  }

  compare(purePassword: string, encryptedPassword: string): boolean {
    return this.encrypt(purePassword) === encryptedPassword
  }
}
