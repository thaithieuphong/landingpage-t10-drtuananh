const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Customer = new Schema({
	firstName: String,
	lastName: String,
	phone: Number,
	description: String,
	resource: String,
	statusCus: {
		statusVi: String,
		statusEng: String	
	},
}, {
	timestamps: true
});

Customer.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: 'all',
});

module.exports = mongoose.model('Customer', Customer);