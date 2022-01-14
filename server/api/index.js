module.exports = app => {
	const express = require('express');
	const resourceMiddleware = require('../middlewares/resource');
	const AdminUser = require('../models/AdminUser');
	const jwt = require('jsonwebtoken');
	const assert = require('http-assert');
	const authMiddleware = require('../middlewares/auth');

	const router = express.Router({
		mergeParams: true,
	});

	router.post('/', async (req, res) => {
		const model = await req.Model.create(req.body);
		res.send(model);
	});

	router.get('/', async (req, res) => {
		const model = await req.Model.find()
			.sort({ name: 'asc' })
			.populate('category')
			.populate('stuName')
			.lean();
		res.send(model);
	});

	router.post('/pagination', async (req, res) => {
		const { page, size } = req.body;
		const model = await req.Model.find()
			.sort({ name: 'asc' })
			.populate('category')
			.populate('stuName')
			.skip((page - 1) * size)
			.limit(5)
			.lean();
		const totalCount = await req.Model.find().countDocuments();
		res.send({ model, totalCount });
	});

	router.get('/:id', async (req, res) => {
		const model = await req.Model.findById(req.params.id);
		res.send(model);
	});

	router.put('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
		res.send(model);
	});

	router.delete('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndDelete(req.params.id);
		res.send({
			success: true,
		});
	});

	// 通用接口
	app.use('/api/rest/:resource', resourceMiddleware(), router);

	//登录接口
	app.post('/api/login', async (req, res) => {
		const { username, password } = req.body;

		const user = await AdminUser.findOne({ username }).select('+password');
		assert(user, 422, '用户不存在');

		const isValid = require('bcrypt').compareSync(password, user.password);
		assert(isValid, 422, '密码错误');

		const token = jwt.sign({ id: user._id }, app.get('secret'));
		res.send({ token, user });
	});

	// 错误处理
	app.use(async (err, req, res, next) => {
		res.status(err.statusCode || 500).send({
			message: err.message,
		});
	});
};
