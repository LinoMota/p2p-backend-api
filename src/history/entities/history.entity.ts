export class History {
  brandId: string
  userId: string
  type: 'in' | 'out'
  quantity: number
  paymentMethod: 'cash' | 'card' | 'transfer' | 'pix'
  value: number
}
