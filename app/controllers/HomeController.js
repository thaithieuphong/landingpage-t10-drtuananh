const Customer = require("../models/Customer");
const path = require('path');
const rootPath = path.sep;

const {
	multipleMongooseToObject,
	mongooseToObject,
} = require("../../util/mongoose");

class HomeController {

	getHome(req, res, next) {
		res.render('home');
	}

	postCustomer(req, res, next) {
		if (req.body.fullName !== '' && req.body.phone !== '' && req.body.require !== '') {
			const customer = new Customer({
				lastName: req.body.fullName,
				phone: req.body.phone,
				description: req.body.require,
			});
			customer.save();
			req.flash('messages_createCustomer_success', 'Đặt lịch thành công');
		}

		if (req.body.fullName === '' || req.body.phone === '' || req.body.require === '') {
			req.flash('messages_createCustomer_failure', 'Đặt lịch không thành công');
		}
		res.redirect("back");
	}

}

module.exports = new HomeController();
