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
const https = require('https');

//配置https对象
// const options = {
//     key: fs.readFileSync(path.join(__dirname, '../https', 'queuecat.top.key')),
//     cert: fs.readFileSync(path.join(__dirname, '../https', 'queuecat.top.pem'))
// };

const httpServer = http.createServer(app);
const httpsServer = https.createServer({}, app);

// 一级路由
const router = {
	api: require('./router/api'),
	intercept: require('./router/intercept'),
};

// 静态资源托管
// app.use(express.static(path.join(__dirname, './public')));
// 抓包接口
app.use('/api', router.api);
// 拦截
app.use(router.intercept);

httpServer.listen(3000, () =>
	console.log('\033[42;30m 成功 \033[0m', '服务器启动成功')
);
httpsServer.listen(3001, () =>
	console.log('\033[42;30m 成功 \033[0m', '服务器启动成功 on port 443')
);
