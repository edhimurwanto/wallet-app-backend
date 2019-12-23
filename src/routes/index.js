const customer = require('./customer.route');
const auth = require('./auth.router');

module.exports = [].concat(customer, auth);