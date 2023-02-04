export class Stock {
  userId: string
  brandId: string
  type: 'in' | 'out'
  quantity: number
  paymentMethod: 'card' | 'transfer' | 'pix'
  state: 'COMPLETED' | 'PENDING' | 'CANCELED' | 'OPEN'
  value: number
  createdAt: string
}
