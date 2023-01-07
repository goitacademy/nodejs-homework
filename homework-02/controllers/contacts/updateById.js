const { contactsOperations } = require("../../model")
const newError = require("../../model/newError")
const { contactSchema } = require("../../schemas")

const updateById = async (req, res, next) => {
    const { body, params: { id } } = req
    const result = await contactsOperations.updateById(id, body)
    if (!result) {
        const message = `Contact whith id:${id} not found`
        newError(404, message)
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = updateById