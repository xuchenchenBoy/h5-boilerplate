var ts = '20170309',
    debug = false;

if(/test/gi.test(location.search)){
    debug = true;
}

var MODULE = {

    nodes: {

    },

    params: { 
      pcMaskEl: '.J-pc-mask'
    },
  
    class: {
      showPcMask: 'show-pc-mask'
    },
  
    init: function() {
      this.compatiblePC();
    },

    compatiblePC: function() {
      // 非移动端设备
      if(!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
        $(this.nodes.pcMaskEl).addClass(this.class.showPcMask);
      }
    },
};

$(function(){

    "use strict";

    $(document)
    .on('touchmove', function(e){
        e.preventDefault();
    })
    .on('touchstart', function(e){
    });

    FastClick.attach(document.body);

    // 初始化
    MODULE.init();
});
