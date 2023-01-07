const express = require('express')

const { contacts: ctrl } = require("../../../controllers")
const { validation, ctrlWrapper } = require('../../../middlewares')
const { contactSchema } = require('../../../schemas')

const validateMiddleware = validation(contactSchema)

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll))

router.get("/:id", ctrlWrapper(ctrl.getById))

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add))

router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateById))

router.delete("/:id", ctrlWrapper(ctrl.deleteById))

module.exports = router