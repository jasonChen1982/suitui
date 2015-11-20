;(function(root){
	function SuitUI(json) {
	    this.VOH = json.VOH || 'width';
	    this.DsgSize = json.DsgSize || 640;
	    this.root = document.getElementsByTagName('html')[0];
	    this.meta = document.createElement("meta");
	    this.hadPut = false;
	    this.rem = json.rem || 100;
	    this.isIOS = window.navigator.appVersion.match(/iphone/gi)!==null;
	    this.putMeta();
	};
	SuitUI.prototype.init = function() {
	    var This = this;
	    window.addEventListener('resize', function() {
	        This.suit();
	    }, false);
	}; 
	SuitUI.prototype.putMeta = function() {
	    var rato = this.isIOS?0.5:1.0;
	    this.meta.setAttribute("name","viewport");
	    this.meta.setAttribute("content","initial-scale="+rato+", maximum-scale="+rato+", minimum-scale="+rato+", user-scalable=no");
	    if(!this.hadPut){
	        this.root.firstElementChild.appendChild(this.meta);
	        this.hadPut = true;
	        this.init();
	    }
	};
	SuitUI.prototype.suit = function() {
	    var nowSize = this.VOH === 'width' ? window.innerWidth : window.innerHeight;
	    this.curRem = this.rem * nowSize / this.DsgSize;
	    this.root.style.fontSize = this.curRem + 'px';
	};
	root.JC = root.JC || {};
	root.JC.UI = new SuitUI({
	    'VOH': 'width',
	    'DsgSize': 640
	});
	root.JC.UI.suit();
})(this);