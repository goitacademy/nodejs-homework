const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const getCurrentUser = require('./getCurrentUser');
const updateUserSubscription = require('./updateUserSubscription');

const users = {
	login,
	logout,
	signup,
	getCurrentUser,
	updateUserSubscription,
};
module.exports = {
	users,
};
