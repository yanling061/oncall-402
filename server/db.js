module.exports = app => {
	const mongoose = require('mongoose');
	mongoose.connect(
		'mongodb+srv://root:root@oncall402.jvjz5.mongodb.net/oncall-402?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);

	require('require-all')(__dirname + '/./models');
};
