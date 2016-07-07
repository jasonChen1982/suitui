(function() {
    'use strict';
    var UI = {
        VOH: 'width',
        DsgSize: 640,
        root: document.getElementsByTagName('html')[0],
        needPut: false,
        ucHole: 1,
        rem: 100,
        isUC: /uc/i.test(window.navigator.userAgent)
    };

    UI.init = function(opts){
        opts = opts||{};
        this.VOH = opts.VOH || 'width';
        this.DsgSize = opts.DsgSize || 640;
        this.rem = opts.rem || 100;
        this.meta = document.querySelector('meta[name="viewport"]')||false;
        this._putMeta();
    };
    UI._putMeta = function(){
        if(!this.meta){
            this.meta = document.createElement('meta');
            this.meta.setAttribute('name', 'viewport');
            this.needPut = true;
        }
        this.meta.setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
        if (this.needPut) {
            this.root.firstElementChild.appendChild(this.meta);
            this.needPut = false;
        }
        this.suit();
        this._ears();
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
        tPX = parseInt(window.getComputedStyle(dom, null).fontSize)||tPX;

        this.ucHole = sPX/tPX;

        this.suit();

        setTimeout(function() {
            document.body.removeChild(dom);
        }, 100);
    };
    UI.suit = function(){
        var nowSize = this.VOH==='width'? document.documentElement.offsetWidth : document.documentElement.offsetWidth;
        this.sPPR = this.rem * nowSize / this.DsgSize;
        this.curPPR = this.ucHole * this.sPPR;
        this.root.style.fontSize = this.curPPR + 'px';
    };
    UI.RTP = function(rem,bool){
        return (bool?rem*this.curPPR:rem*this.sPPR) >> 0;
    };
    UI.PTR = function(px){
        return px/this.curPPR;
    };

    window.JC = window.JC || {};
    window.JC.UI = UI;
})();
