# suitui 
web移动开发页面自适应解决方案，采用rem来统一页面视觉表现。suitui提供了页面自适应能力，并解决了各个浏览器在实现rem上的差异和问题。

### 使用简介 ###


#### 普通版本
    
安装组件到项目 （bower）


```shell
bower install git@git.ucweb.local:redfe/suitui.git#~0.1.5
```

**使用**
```html
    <head>
    <!-- 屏蔽我厂的个性化功能 -->
    <meta name="wap-font-scale" content="no">
    <meta content="scale-font-size" content="no">
    <script type="text/javascript" src='../../bower_components/suitui/src/suitui.js?__inline'></script>
    <script type="text/javascript">
        // {
        //     'VOH': 'width', // 指明是以 width｜height 为基准，default 'width'
        //     'DsgSize': 640, // 传入设计稿的设计尺寸，传入值为VOH做指明属性的大小，default 640
        //     'rem': 100 // rem到px的兑换比例，为了方便可以设为100、1000、10000...(不要设为10) default 100
        // }
        window.JC.UI.init();
    </script>
    </head>
```


#### 高清版本 （解决困扰你的一像素问题）

安装组件到项目 （bower）


```shell
bower install git@git.ucweb.local:redfe/suitui.git#~0.2.0
```

**使用**
```html
    <head>
    <!-- 屏蔽我厂的个性化功能 -->
    <meta name="wap-font-scale" content="no">
    <meta content="scale-font-size" content="no">
    <script type="text/javascript" src='../../bower_components/suitui/src/suitui.js?__inline'></script>
    <script type="text/javascript">
        // 以下追加配置根据个人口味需要添加
        // window.JC.UI.init({
        //     'VOH': 'width', // 指明是以 width｜height 为基准，default 'width'
        //     'DsgSize': 640, // 传入设计稿的设计尺寸，传入值为VOH做指明属性的大小，default 640
        //     'resolution': 1, // 分辨率值，传入1时为普通非高清的页面viewport，默认值为设备自身的分辨率
        //     'rem': 100 // rem到px的兑换比例，为了方便可以设为100、1000、10000...(不要设为10) default 100
        // });
    </script>
    </head>
```