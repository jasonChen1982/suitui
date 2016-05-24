var express = require('express'),
    app = express();

// 根目录
var basePath = process.cwd();
app.use(express.static(basePath));

// 首页为 index_dev.html
app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(' iceActive listening on port ' + port);
});