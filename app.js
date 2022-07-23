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
// const https = require('https');
//配置https对象
const httpServer = http.createServer(app);

app.use(express.static(path.join(__dirname, './public')));
app.use((req, res) => {
	console.log(123);
	console.log(req.url);
});

httpServer.listen(3000, () =>
	console.log('\033[42;30m 成功 \033[0m', '服务器启动成功')
);
