const app = require('../app')
const contactsPath = require('../db/contacts')
const { parseJsonData } = require('../model')

const {PORT = 3000} = process.env

app.listen(PORT, () => {
    console.log(`Server runing. Use our API on port: ${PORT}`)
})
