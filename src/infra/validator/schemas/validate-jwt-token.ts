import joi from 'joi'

export const validateJwtSchema = joi.object({
  token: joi.string().required(),
})
