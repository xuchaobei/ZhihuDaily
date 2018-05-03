# ZhihuDaily
仿知乎日报App，React+Redux+Cordova<br>

<h3>截图</h3>

![image](https://github.com/xuchaobei/ZhihuDaily/blob/master/src/img/zhihu.gif)

<h3>安装包</h3>
在手机上安装apk文件夹下的安装包。只提供了Android平台的安装包。

<h3>环境准备</h3>
1、安装Nodejs环境。<br>
2、安装Cordova环境。<br>

<h3>在浏览器中访问</h3>
1、进入src文件夹。<br>
2、执行npm install。<br>
3、执行npm start。<br>
4、在浏览器中打开http://localhost:3000即可访问应用。</br>

<h3>打包成apk或ipa</h3>
1、进入src文件夹。<br>
2、执行npm build。<br>
3、将index.html和bundle.js，复制到对应platforms下，利用cordova进行打包（参考Cordova官网）<br>
4、默认使用了crosswalk-webview插件，以避免不同webview内核带来的差异。

<h3>注意事项</h3>

直接通过浏览器访问应用时，由于访问图片资源时，Header中的Referer值为localhost:3000，会被知乎禁止访问图片。<br>

解决方案：使用Charles或Fiddler等代理软件，修改请求的Header，删除Referer。<br>

如果使用的是Charles，修改方式为：Tools -> Rewrite，新增一条Rewrite规则，如下图所示。

![image](https://github.com/xuchaobei/ZhihuDaily/blob/master/rewrite-rule.png)

<h3>LICENSE</h3>
MIT
