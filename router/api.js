// 引用express框架
const express = require('express');

const api = express.Router();

api.use('/getList', (req, res) => {
	res.send([1, 2, 3]);
});

//导出路由对象
module.exports = api;
