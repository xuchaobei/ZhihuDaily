# ZhihuDaily
仿知乎日报App，React+Redux+Cordova

<h3>环境准备</h3>
1、安装Nodejs环境。<br>
2、安装Cordova环境。<br>

<h3>在浏览器中访问</h3></br>
1、进入www文件夹。<br>
2、执行npm install。<br>
3、执行npm start。<br>
4、在浏览器中打开http://localhost:3000即可访问应用。</br>


<h3>打包成apk或ipa</h3>
1、进入www文件夹。<br>
2、执行npm build。<br>
3、将index.html和bundle.js，复制到对应platforms下，利用cordova进行打包（参考Cordova官网）
4、默认使用了crosswalk-webview插件，以避免不同webview内核带来的差异。
