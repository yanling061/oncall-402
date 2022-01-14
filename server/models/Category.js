const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: { type: String },
	desc: { type: String },
});

module.exports = mongoose.model('Category', schema, 'categories');
