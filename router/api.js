// 引用express框架
const express = require('express');
const { getList } = require('../module/list');

const api = express.Router();

api.use('/getList', (req, res) => {
	res.send(getList());
});

//导出路由对象
module.exports = api;
