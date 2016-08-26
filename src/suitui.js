(function() {
    'use strict';
    var UI = {
        VOH: 'width',
        DsgSize: 640,
        root: document.documentElement,
        needPut: false,
        ucHole: 1,
        resolution: Math.min(2,window.devicePixelRatio),
        rem: 100,
        monitoring: false,
        isUC: /uc/i.test(window.navigator.userAgent)
    };

    UI.init = function(opts) {
        opts = opts || {};
        this.VOH = opts.VOH || 'width';
        this.DsgSize = opts.DsgSize || 640;
        this.rem = opts.rem || 100;
        this.resolution = opts.resolution || this.resolution;
        this.meta = this.meta || document.querySelector('meta[name="viewport"]');
        this._putMeta();
    };
    UI._putMeta = function() {
        if (!this.meta) {
            this.meta = document.createElement('meta');
            this.meta.setAttribute('name', 'viewport');
            this.needPut = true;
        }
        var ratio = 1/this.resolution;
        this.meta.setAttribute('content', 'width=device-width,initial-scale='+ratio+', maximum-scale='+ratio+', minimum-scale='+ratio+', user-scalable=no');
        if (this.needPut) {
            document.head.appendChild(this.meta);
            this.needPut = false;
        }
        this.suit();
        this._ears();
    };
    UI._ears = function() {
        if (this.monitoring) return;
        var This = this;
        window.addEventListener('resize', function() {
            This.suit();
        }, false);
        document.addEventListener("DOMContentLoaded", function() {
            This.isUC && This._fillHole();
        });
        setTimeout(function() {
            This.suit();
        }, 100);
        this.monitoring = true;
    };
    UI._fillHole = function() {
        var dom = document.createElement('div'),
            sPX = 100,
            tPX = 100;
        dom.style.fontSize = sPX + "px";
        document.body.appendChild(dom);
        tPX = parseInt(window.getComputedStyle(dom, null).fontSize, 10) || tPX;

        this.ucHole = sPX / tPX;

        this.suit();

        setTimeout(function() {
            document.body.removeChild(dom);
        }, 100);
    };
    UI.suit = function() {
        var nowSize = this.VOH === 'width' ? document.documentElement.offsetWidth : document.documentElement.offsetHeight;
        this.sPPR = this.rem * nowSize / this.DsgSize;
        this.curPPR = this.ucHole * this.sPPR;
        this.root.style.fontSize = this.curPPR + 'px';
    };
    UI.RTP = function(rem, bool) {
        return (bool ? rem * this.curPPR : rem * this.sPPR) >> 0;
    };
    UI.PTR = function(px) {
        return px / this.curPPR;
    };

    window.JC = window.JC || {};
    window.JC.UI = UI;
})();
window.JC.UI.init();