var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}
window.RAF = window.requestAnimationFrame;


function EditIMG(json){
    this.input = document.getElementById(json.input);
    this.fileReader = new FileReader();
    this.img = document.createElement('img');
    this.onChange = json.onChange||null;
    this.initReader();
}
EditIMG.prototype.createImg = function(){
    var This = this;
    this.img.onload = function (){
        This.onChange&&This.onChange(This.img);
    };
    this.img.src = this.fileReader.result;
};
EditIMG.prototype.initReader = function(){
    var This = this;
    this.fileReader.onload = function(ev){
        if(FileReader.DONE===This.fileReader.readyState){
            This.createImg();
        }
    };
    this.input.addEventListener('change',function(){
        This.input.files[0]&&This.fileReader.readAsDataURL(This.input.files[0]);
    },false);
};


var upfile = document.getElementById('upfile');
var JCReader = new EditIMG({
                    input: 'upfile',
                    onChange: function(img){
                    	stage.setMaterial(img);
    					stage.render();
                    }
                });

var stage = new JC.Prune({
    canvas: 'photo_mirro',
    width: window.JC.UI.RTP(3.76),
    height: window.JC.UI.RTP(4.44),
    touchArea: $('touch_area')
});

window.addEventListener('resize',function (){
    stage.resize(window.JC.UI.RTP(3.76),window.JC.UI.RTP(4.44));
},false);

$('up_file').addEventListener('click',function(){
	var base = stage.toData({
						x: 110, // 默认0
						y: 110, // 默认0
						w: stage.width-120, // 默认canvas的宽度
						h: stage.height-120,  // 默认canvas的高度
						type: 'jpeg',	// 默认jpeg压缩。 无特殊需求，务必使用jpeg。
						quality: 100   // 默认不压缩，值为100，接受 0-100的数字类型。
					});
	console.log(base);
    $('target_img').src = base;
    $('output_window').style.display = 'block';
},false);
