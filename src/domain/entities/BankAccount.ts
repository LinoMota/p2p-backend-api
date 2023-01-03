export default interface BankAccount {
  name: string
  agency: string
  account: string
  type: 'corrente' | 'poupança'
  bankCode: string
}
