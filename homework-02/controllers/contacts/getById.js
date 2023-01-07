const { contactsOperations } = require("../../model")
const newError = require("../../model/newError")

const getById = async (req, res, next) => {
    const { id } = req.params
    const result = await contactsOperations.getById(id)
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

module.exports = getById