// 引用express框架
const express = require('express');
const axios = require('axios');

const intercept = express.Router();

intercept.use((req, res) => {
	const url = req.url;
	const method = req.method;
	console.log(url);
	// res.send('1');
	axios(req)
		.then((data) => {
			console.log(Object.keys(data));
			console.log('data.data', data.data);
			res.send(data);
		})
		.catch((err) => {
			console.log('err', err.message);
		});
});

//导出路由对象
module.exports = intercept;
