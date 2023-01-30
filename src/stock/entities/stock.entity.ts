export class Stock {
  userId: string
  brandId: string
  type: 'in' | 'out'
  quantity: number
  paymentMethod: 'card' | 'transfer' | 'pix'
  state: 'COMPLETED' | 'PENDING' | 'CANCELED'
  value: number
}
