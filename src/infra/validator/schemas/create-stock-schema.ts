import joi from 'joi'

export const createStockSchema = joi.object({
  user: joi.string().required(),
  type: joi.string().valid('in', 'out').required(),
  quantity: joi.number().required(),
  brand: joi.string().required(),
  paymentMethod: joi.string().valid('PIX', 'CREDIT', 'DEBIT').default('PIX'),
  state: joi.string().valid('COMPLETED', 'PENDING', 'CANCELED').default('PENDING'),
  value: joi.number().required(),
})
