// 引用express框架
const express = require('express');
// const axios = require('axios');
const request = require('request');
const http = require('http');

const intercept = express.Router();

intercept.use((req, res) => {
	const url = req.url;
	const method = req.method;
	console.log(url);
	res.send('1');
	// axios(req)
	// 	.then((data) => {
	// 		// console.log(Object.keys(data));
	// 		// console.log('data.data', data.data);
	// 		// res.send(data.data);
	// 	})
	// 	.catch((err) => {
	// 		console.log('err', err.message);
	// 	});
	// request(req,(error, response, body)=>{
	//   console.log(error);
	// })
	if (req.secure) {
		console.log(req.secure,url);
    
	} else {
		console.log(req.secure,url);
	}
});

//导出路由对象
module.exports = intercept;
