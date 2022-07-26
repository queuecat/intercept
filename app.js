// 引用express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 引入系统模块path获取目录
const path = require('path');
// 引用fs模块
const fs = require('fs');
//引入http模块
const http = require('http');
const { pushList } = require('./module/list');


const httpServer = http.createServer(app);

// 一级路由
const router = {
	api: require('./router/api'),
	intercept: require('./router/intercept'),
};

// 拦截
app.use(router.intercept);
// 静态资源托管
app.use(express.static(path.join(__dirname, './public')));
// 抓包接口
app.use('/api', router.api);


// todo https临时解决方案
const net = require('net');
const url = require('url');

httpServer.addListener('connect', function (req, cltSocket, head) {
	console.log('connect', req.url);
	let result = ''
	const srvUrl = url.parse(`http://${req.url}`);
	try {
		const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
			cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
				'Proxy-agent: Node.js-Proxy\r\n' +
				'\r\n');
			srvSocket.write(head);
			srvSocket.pipe(cltSocket);
			cltSocket.pipe(srvSocket);

		});
		srvSocket.on('data', function (chunk) {
			result += chunk
		});
		srvSocket.on('end', function () {
			pushList({
				url: `https://${req.url}`,
				method: req.method,
				request: { headers: req.headers },
				response: {
					headers: {},
					body: result,
					code: 200,
				},
			});
		});
	} catch (error) {
		console.log(error);
	}

})


app.use((err, req, res, next) => {
	res.status(500).send('服务器错误')
})
httpServer.listen(3000, () =>
	console.log('\033[42;30m 成功 \033[0m', '服务器启动成功 on port 3000')
);
