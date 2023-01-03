import Address from './Address'
import BankAccount from './BankAccount'

export default interface User {
  id?: string
  name: string
  email: string
  password: string
  cpf?: string
  phone?: string
  birthDate?: Date
  address?: Address
  bankAccount?: BankAccount
}
