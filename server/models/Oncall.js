const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		stuName: { type: mongoose.SchemaTypes.ObjectId, ref: 'Student' },
		date: { type: String },
		period: [{ type: String }],
		extraPeriod: [{ type: Number }],
		note: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Oncall', schema);
