// 引用express框架
const express = require('express');
const { getList } = require('../module/list');
const { setMap, clearMap } = require('../module/map');
const formidableMiddleware = require('express-formidable');


const api = express.Router();

api.use(formidableMiddleware());

api.use('/getList', (req, res) => {
	res.send(getList());
});
api.post('/setMap', (req, res) => {
	const { value, key } = req.fields;
	setMap(key, value)
	res.send({ code: 0, msg: '成功' });
});
api.post('/clearMap', (req, res) => {
	const { key } = req.fields;
	clearMap(key)
	res.send({ code: 0, msg: '成功' });
});

//导出路由对象
module.exports = api;
