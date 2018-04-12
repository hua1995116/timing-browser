(function(w) {
    w._error_storage_ = [];
    w.ERROR_CONFIG = {
        client: 'tuia',
        pageId: 'smashg_2',
        version: '0.0.1',
        imgUrl: 'http://retcode.tuipink.com/report',
    };
    function errorhandler(){
        // 用于记录当前的错误            
        w._error_storage_&&w._error_storage_.push([].slice.call(arguments));
    } 
    w.addEventListener && w.addEventListener("error", errorhandler, true);
    var times = 3,
    appendScript = function appendScript() {
        var sc = document.createElement("script");
        sc.async = !0,
        sc.src = '//activity.zuixhd.com/javascripts/timing.js',  // 取决于你存放的位置
        sc.crossOrigin = "anonymous",
        sc.onerror = function() {
            times--,
            times > 0 && setTimeout(appendScript, 1500)
        },
        document.head && document.head.appendChild(sc);
    };
    setTimeout(appendScript, 1500);
})(window);