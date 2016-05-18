# suitui 
web移动开发页面自适应解决方案，采用rem来统一页面视觉表现。suitui提供了页面自适应能力，并解决了各个浏览器在实现rem上的差异和问题。

### 使用简介 ###
组件可以通过jc工具进行安装，或者通过bower安装

安装组件到项目 （jc）

	jc

```shell
jc i suitui
```

    
安装组件到项目 （bower）

    bower

```shell
bower install git@git.ucweb.local:redfe/suitui.git
```

**使用**
```html
    <script type="text/javascript" src='../../bower_components/suitui/src/suitui.js?__inline'></script>
    <script type="text/javascript">
    	window.JC.UI.init({
	        'VOH': 'width', // 指明是以 width｜height 为基准，default 'width'
	        'DsgSize': 640, // 传入设计稿的设计尺寸，传入值为VOH做指明属性的大小，default 640
	        'rem': 100 // rem到px的兑换比例，为了方便可以设为100、1000、10000...(不要设为10) default 100
    	});
    </script>
```