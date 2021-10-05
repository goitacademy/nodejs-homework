const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');

const auth = {
	login,
	logout,
	signup,
};
module.exports = {
	auth,
};
