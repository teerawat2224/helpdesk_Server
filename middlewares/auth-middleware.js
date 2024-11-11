const Joi = require('joi')
const createError = require('../utils/createError')

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).required(),
})

exports.registerAuthen = async (req, res, next) => {
    try {
        await registerSchema.validateAsync(req.body)
        next()
    } catch (err) {
        next(createError(400, err.message))
    }
}
