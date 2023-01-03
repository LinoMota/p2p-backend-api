import joi from 'joi'

export const validateJwtSchema = joi.object({
  authorization: joi.string().required(),
})
