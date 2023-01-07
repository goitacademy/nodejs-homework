const { contactsOperations } = require("../../model")

const getAll = async (req, res, next) => {
    const result = await contactsOperations.getAll()
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getAll