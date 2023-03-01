import { Address } from './address'
import { BankAccount } from './bankAccount'

export class User {
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
