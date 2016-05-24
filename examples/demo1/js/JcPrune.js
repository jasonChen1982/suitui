;(function(root){
	function Prune(json){
		this.canvas = document.getElementById(json.canvas);
		this.ctx = this.canvas.getContext('2d');
		this.width = json.width;
		this.height = json.height;
		this.x = (json.x!==undefined)?json.x:this.width/2;
		this.y = (json.y!==undefined)?json.y:this.height/2;
		this.material = null;
		this.touchArea = json.touchArea||document;
		this.oldPosX = 0;
		this.oldPosY = 0;
		this.startPosX = 0;
		this.startPosY = 0;
		this.SV = {};
		this.preDeg = 0;
		this.disMark = 0;

		this.isTwo = false;

		this.toDeg = 180/Math.PI;

		this.cacheCanvas = document.createElement('canvas');

		this.inRender = false;
		this.needBind = true;

		this.stop = false;

		json.material&&this.setMaterial(json.material);

		this.init();
	}
	Prune.prototype.setMaterial = function (img){
		this.material = new Material({image: img});
		this.material.scale = Math.max(this.height/this.material.height,this.width/this.material.width);
		this.oldScale = this.material.scale;
		this.needBind&&this.bindTouches();
		this.oldPosX = 0;
		this.oldPosY = 0;
		this.preDeg = 0;
	};
	Prune.prototype.init = function (){
		this.resize();
	};
	Prune.prototype.bindTouches = function (){
		this.hadBind = false;
		var This = this;
		this.touchArea.addEventListener("touchstart",function(ev){
	    	if(ev.touches.length>1){
	    		This.isTwo = true;
	    		This.startScale(ev);
	    		This.startRotate(ev);
	    	}else{
	    		This.isTwo = false;
	    		This.startPos(ev);
	    	}
	    },false);
	    this.touchArea.addEventListener("touchmove",function(ev){
	    	ev.preventDefault();
	    	if(ev.touches.length>1&&This.disMark!==0){
	    		This.isTwo = true;
	    		This.moveScale(ev);
	    		if(This.disMark>60)This.moveRotate(ev);
	    	}else{
	    		if(This.isTwo)This.startPos(ev);
	    		This.isTwo = false;
		    	This.movePos(ev);
		    }
	    },false);
	    this.touchArea.addEventListener("touchend",function(ev){
	    	if(This.isTwo){
		    	This.endScale();
		    	This.endRotate();
	    	}else{
	    		This.endPos();
	    	}
	    },false);
	};
	Prune.prototype.startPos = function (ev){
		this.startPosX = ev.touches[0].pageX;
	    this.startPosY = ev.touches[0].pageY;
	};
	Prune.prototype.movePos = function (ev){
		var intervalX = ev.touches[0].pageX-this.startPosX;
		var intervalY = ev.touches[0].pageY-this.startPosY;
		this.material.x = this.oldPosX + intervalX;
		this.material.y = this.oldPosY + intervalY;
	};
	Prune.prototype.endPos = function (){
		this.oldPosX = this.material.x;
		this.oldPosY = this.material.y;
	};
	Prune.prototype.startScale = function (ev){
		var x = ev.touches[0].pageX - ev.touches[1].pageX;
		var y = ev.touches[0].pageY - ev.touches[1].pageY;
		this.disMark = Math.sqrt(x*x+y*y);
	};
	Prune.prototype.moveScale = function (ev){
		var x = ev.touches[0].pageX - ev.touches[1].pageX;
		var y = ev.touches[0].pageY - ev.touches[1].pageY;
		var scale = Math.sqrt(x*x+y*y)/this.disMark;
		this.material.scale = this.oldScale*scale;
	};
	Prune.prototype.endScale = function (){
		this.oldScale = this.material.scale;
	};
	Prune.prototype.startRotate = function (ev){
		var p1 = {},p2 = {};
		p1.x = ev.touches[0].pageX;
	    p1.y  = ev.touches[0].pageY;
		p2.x = ev.touches[1].pageX;
	    p2.y  = ev.touches[1].pageY;
	    this.SV = {
	    	x: p1.x-p2.x,
	    	y: p1.y-p2.y
	    };
	};
	Prune.prototype.moveRotate = function (ev){
		var p1 = {},p2 = {};
		p1.x = ev.touches[0].pageX;
	    p1.y  = ev.touches[0].pageY;
		p2.x = ev.touches[1].pageX;
	    p2.y  = ev.touches[1].pageY;
	    var INV = {
	    	x: p1.x-p2.x,
	    	y: p1.y-p2.y
	    };
		var nor = this.SV.x*INV.y-INV.x*this.SV.y;
		var pi = nor>0?1:-1;
	    var tmp = (INV.x*this.SV.x+INV.y*this.SV.y)/(Math.sqrt(INV.x*INV.x+INV.y*INV.y)*Math.sqrt(this.SV.x*this.SV.x+this.SV.y*this.SV.y));

	    var iNowDeg = pi*Math.acos(tmp)*this.toDeg;

	    this.material.rotation = this.preDeg + iNowDeg;
	};
	Prune.prototype.endRotate = function (){
		this.preDeg = this.material.rotation;
	};
	Prune.prototype.draw = function (){
		if(!this.material)return;
		var ctx = this.ctx;
		ctx.clearRect(0,0,this.width,this.height);
		ctx.save();
		ctx.translate(this.x,this.y);
		this.material.draw(this.ctx);
		ctx.restore();
	};
	Prune.prototype.resize = function(w,h){
		w = (w!==undefined)?w:this.width;
		h = (h!==undefined)?h:this.height;
		this.width = this.canvas.width = w;
	    this.height = this.canvas.height = h;
	    this.canvas.style.width = w+'px';
	    this.canvas.style.height = h+'px';
	};
	Prune.prototype.toData = function (json){ // x,y,w,h,type,quality
		var x = json.x || 0,
			y = json.y || 0,
			w = json.w!==undefined?json.w:this.width,
			h = json.h!==undefined?json.h:this.height,
			format = json.type || 'jpeg',
			q = json.quality!==undefined?json.quality:100;

		this.cacheCanvas.width = w;
		this.cacheCanvas.height = h;
		var ctx = this.cacheCanvas.getContext('2d');
		ctx.clearRect(0,0,w,h);
		ctx.drawImage(this.canvas,x,y,w,h,0,0,w,h);
		var type = 'image/'+format;
		var quality = q/100;
		
		return format==='jpeg'?this.cacheCanvas.toDataURL(type,quality):this.cacheCanvas.toDataURL(type);
	};
	Prune.prototype.render = function (){
		if(this.inRender)return;
		var This = this;
		this.inRender = true;
		this.stop = false;
		function go(){
		    This.draw();
		    if(!This.stop){
		    	RAF(go);
		    }else{
		    	This.inRender = false;
		    }
		}
		RAF(go);
	};
	Prune.prototype.stopRender = function(){
		this.stop = true;
	};
	function Material(json){
		this.image = json.image;
		this.width = json.width||this.image.width;
		this.height = json.height||this.image.height;
		this.scale = 1;
		this.rotation = 0;
		this.x = 0;
		this.y = 0;
		this.regX = 0.5*this.width;
		this.regY = 0.5*this.height;
		this.toRad = Math.PI/180;
	}
	Material.prototype.updateTransform = function (ctx){
		var cos = 1;
		var sin = 0;
		if (this.rotation%360) {
			var r = this.rotation*this.toRad;
				cos = Math.cos(r);
				sin = Math.sin(r);
		}
		
		ctx.transform(cos,sin,-sin,cos,this.x,this.y);
		if(this.skewX%90||this.skewY%90){
			var sRX = this.skewX*JC.toRad;
			var sRY = this.skewY*JC.toRad;
			var tanX = Math.tan(sRX);
			var tanY = Math.tan(sRY);
			ctx.transform(1,tanY,tanX,1,0,0);
		}
		ctx.transform(this.scale,0,0,this.scale,0,0);
	};
	Material.prototype.draw = function (ctx){
		ctx.save();
		this.updateTransform(ctx);
		ctx.drawImage(this.image, 0, 0, this.width, this.height, -this.regX, -this.regY, this.width, this.height);
		ctx.restore();
	};


	if (typeof exports === 'object') {
        // CommonJS
        module.exports = Prune;
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(Prune);
    } else if (typeof define === 'function' && define.cmd) {
        // CMD
        define(function (require, exports, module) {
            module.exports = Prune;
        });
    } else {
        // Global Variables
        root.JC = root.JC || {};
        root.JC.Prune = Prune;
    }


})(this);