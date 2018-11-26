# webpack-multi-page

webpack 多页面打包项目

# 运行项目

```
# development
$ npm install
$ npm run dev

# production
$ npm install
$ npm run build
```

# 项目配置

- **pug**
- **eslint**
- **jquery**

可在`config.js`中选择是否开启

# 热更新问题

支持`js`、`css`热更新,如需要 html 热更新可在`view/页面文件夹/同页面名字.js`中引用`pug/html`文件

```
// index.js
require('./index.pug');
```
