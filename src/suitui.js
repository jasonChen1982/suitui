(function() {
    'use strict';
    var UI = {
        VOH: 'width',
        DsgSize: 640,
        root: document.getElementsByTagName('html')[0],
        meta: document.createElement('meta'),
        hadPut: false,
        ucHole: 1,
        rem: 100,
        isIOS: window.navigator.appVersion.match(/iphone/gi) !== null,
        isUC: window.navigator.userAgent.match(/UC/)
    };

    UI.init = function(opts){
        this.VOH = opts.VOH || 'width';
        this.DsgSize = opts.DsgSize || 640;
        this.rem = opts.rem || 100;
        this._putMeta();
    };
    UI._putMeta = function(){
        var rato = this.isIOS ? 0.5 : 1.0;
        this.meta.setAttribute('name', 'viewport');
        this.meta.setAttribute('content', 'initial-scale=' + rato + ', maximum-scale=' + rato + ', minimum-scale=' + rato + ', user-scalable=no');
        if (!this.hadPut) {
            this.root.firstElementChild.appendChild(this.meta);
            this.hadPut = true;
            this.suit();
            this._ears();
        }
    };
    UI._ears = function(){
        var This = this;
        window.addEventListener('resize', function() {
            This.suit();
        }, false);
        document.addEventListener("DOMContentLoaded", function() {
            This.isUC&&This._fillHole();
        });
        setTimeout(function() {
            This.suit();
        }, 100);
    };
    UI._fillHole = function(){
        var dom = document.createElement('div'),
            sPX = 100,
            tPX = 100;
        dom.style.fontSize = sPX+"px";
        document.body.appendChild(dom);
        tPX = window.getComputedStyle(dom, null).fontSize||tPX;

        this.ucHole = sPX/tPX;

        This.suit();
    };
    UI.suit = function(){
        var nowSize = this.VOH==='width'? window.innerWidth||document.documentElement.offsetWidth : window.innerHeight||document.documentElement.offsetWidth;
        this.curPPR = this.ucHole * this.rem * nowSize / this.DsgSize;
        this.root.style.fontSize = this.curPPR + 'px';
    };
    UI.RTP = function(rem){
        return rem*this.curPPR >> 0;
    };
    UI.PTR = function(px){
        return px/this.curPPR;
    };

    window.JC = window.JC || {};
    window.JC.UI = UI;
})();