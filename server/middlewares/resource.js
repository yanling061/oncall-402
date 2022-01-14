module.exports = options => {
	return async (req, res, next) => {
		const modelName = require('inflection').classify(req.params.resource); //把传过来的域名参数对应数据库模型名称
		req.Model = require(`../models/${modelName}`);
		next();
	};
};
