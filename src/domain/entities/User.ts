import BankAccount from './BankAccount'

export default interface User {
  id?: string
  name: string
  email: string
  cpf?: string
  birthDate?: Date
  address?: string
  phone?: string
  bankAccount?: BankAccount
  password: string
}
