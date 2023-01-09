export default interface Stock {
  id?: string
  user: string
  type: 'in' | 'out'
  quantity: number
  brand: string
  state: 'COMPLETED' | 'PENDING' | 'CANCELED'
  value: number
  createdAt?: Date
  updatedAt?: Date
}
