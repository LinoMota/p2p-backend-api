import joi from 'joi'

export const getUserSchema = joi.object({
  Authorization: joi.string().required(),
})
