// 引用express框架
const express = require('express');
const axios = require('axios');
const http = require('http');
const { pushList } = require('../module/list');
const { hasKey } = require('../module/map');


const intercept = express.Router();



intercept.use((req, res, next) => {
	const url = req.url;
	const hostname = req.hostname;

	const map = hasKey(url);

	if (map) {
		pushList({
			url,
			method: req.method,
			request: { headers: req.headers },
			response: {
				headers: {},
				body: map,
				code: 200,
			},
			isMap: true,
		});
		res.send(map);
		return;
	}
	// console.log(req);
	if (hostname === 'localhost') {
		next();
		return;
	}

	console.log(url);
	axios(req)
		.then((response) => {
			pushList({
				url,
				method: req.method,
				request: { headers: req.headers },
				response: {
					headers: response.headers,
					body: response.data,
					code: response.status,
				},
			});
			res.set(response.headers);
			res.send(response.data);
		})
		.catch((err) => {
			console.log('err', err.message);
			pushList({
				url,
				method: req.method,
				request: { headers: req.headers },
				response: {
					headers: err.response ? err.response.headers : {},
					body: err.response ? err.response.data : {},
					code: err.response ? err.response.status : 500,
				},
			});
			res
				.status(err.response ? err.response.status : 500)
				.send(err.response ? err.response.data : 'err');
		});
});




//导出路由对象
module.exports = intercept;
