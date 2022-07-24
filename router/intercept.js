// 引用express框架
const express = require('express');
const axios = require('axios');
const request = require('request');
const http = require('http');

const intercept = express.Router();

intercept.use((req, res) => {
	const url = req.url;
	const method = req.method;
	console.log(url);
	// res.send('1');
	axios(req)
		.then((data) => {
			res.send(data.data);
		})
		.catch((err) => {
			console.log('err', err.message);
		});
	// request(req,(error, response, body)=>{
	//   console.log(error);
	// })
	console.log(123);
});

//导出路由对象
module.exports = intercept;
