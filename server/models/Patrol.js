const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		stuName: { type: mongoose.SchemaTypes.ObjectId, ref: 'Student' },
		date: { type: String },
		period: [{ type: String }],
		classroom: { type: String },
		teacher: { type: String },
		className: { type: String },
		note: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Patrol', schema);
