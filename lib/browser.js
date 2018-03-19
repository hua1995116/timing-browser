(function() {
    window._error_storage_ = [];
    function errorhandler(){
        // 用于记录当前的错误            
        window._error_storage_&&window._error_storage_.push([].slice.call(arguments));
    } 
    window.addEventListener && window.addEventListener("error", errorhandler, true);
    var times = 3,
    appendScript = function appendScript() {
        var sc = document.createElement("script");
        sc.async = !0,
        sc.src = 'http://oys4ga3zg.bkt.clouddn.com/timing.js',  // 取决于你存放的位置
        sc.crossOrigin = "anonymous",
        sc.onerror = function() {
            times--,
            times > 0 && setTimeout(appendScript, 1500)
        },
        document.head && document.head.appendChild(sc);
    };
    setTimeout(appendScript, 1500);
})();