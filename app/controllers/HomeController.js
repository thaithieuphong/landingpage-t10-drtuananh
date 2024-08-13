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
				resource: 'Landing page Trẻ hóa cô bé',
				statusCus: {
					statusVi: 'Tạo mới',
					statusEng: 'New'
				},
			});
			customer.save();
			req.flash('messages_createCustomer_success', 'Đặt lịch hẹn tư vấn thành công');
		}

		if (req.body.fullName === '' || req.body.phone === '' || req.body.require === '') {
			req.flash('messages_createCustomer_failure', 'Đặt lịch hẹn tư vấn không thành công');
		}
		res.redirect("back");
	}

}

module.exports = new HomeController();
