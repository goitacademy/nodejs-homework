const { contactsOperations } = require("../../model")
const newError = require("../../model/newError")

const deleteById = async (req, res, next) => {
    const { id } = req.params
    const result = await contactsOperations.deleteById(id)
    if (!result) {
        const message = `Contact whith id:${id} not found`
        newError(404, message)
    }
    res.json({
        status: 'success',
        code: 200,
        message: "contact deleted",
        data: {
            result
        }
    })
}

module.exports = deleteById