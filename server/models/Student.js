const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		name: { type: String },
		category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Student', schema, 'students');
