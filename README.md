koa+mysql+redis项目起始模板

全局错误处理
日志打印
图片验证码
jwt鉴权
密码sha加密
文件上传
环境变量加载
请求参数校验
prettier代码格式化
sequelize
rbac权限模型

启动
npm install

nodemon启动
npm run dev

node启动
npm run start

pm2启动(自行安装)
npm install pm2 -G
pm2 start src/main.js --name="koa-start"