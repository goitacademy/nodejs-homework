const mongoose = require('mongoose');
require('dotenv').config();

const app = require('../app');

const { DB_USER, DB_USER_PASS, DB_NAME, PORT = 3000 } = process.env;
const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.8pzsd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// console.log(DB_HOST);

mongoose
	.connect(DB_HOST)
	.then(() => app.listen(PORT), console.log(`Server start at: ${PORT} port`))
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	});
