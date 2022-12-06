export default interface IPasswordEncryption {
  encrypt(password: string): string
  compare(password: string, encryptedPassword: string): boolean
}
