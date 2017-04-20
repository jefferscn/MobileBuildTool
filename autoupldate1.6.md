# 1.6App自动更新方案
## 版本检查服务

> 客户需要提供一个检查版本的服务，服务返回的内容如下

```javascript
{"message":[{"androidVersion":"1.1.4",  "androidLink":"https://dev.bokesoft.com/yigomobile/public/apk/1484272290000/万华物流-debug.apk","iosLink":"https://dev.bokesoft.com/yigomobile/public/ios/1483587328000/index.html","iosVersion":"1.1.4"}]}
```
## 配置检查服务地址

> 修改项目中的config.js,

```javascript
result.appOption = {
    homePath:'yigo/subsys_SCM_AppHomepage',
    serverPath:YIGO_SERVER_PATH,
    ...
}
```
