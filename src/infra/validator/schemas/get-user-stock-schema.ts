import joi from 'joi'

export const getUserStockSchema = joi.object({
  userId: joi.string().required(),
  brand: joi.string(),
})
