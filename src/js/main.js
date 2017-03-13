var ts = '20170309',
    debug = false;

if(/test/gi.test(location.search)){
    debug = true;
}

var MODULE = {

    nodes: {

    },

    params: { 

    },

    class: {

    },

    init: function(){

    }
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
