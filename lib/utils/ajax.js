(function(w) {
    var xhr_hack = 'XMLHttpRequest';
    var Oldxhr = w[xhr_hack];
    var xmlHttpNew = function() {
        var XMLHR = Oldxhr;
        var xhr = new XMLHR();
        var xhr_open = xhr.open;
        var xhr_send = xhr.send;
        var start_time, end_time, diff_time;
        xhr.open = function() {
            var param = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
            xhr_open.apply(xhr, param);
        }
        xhr.send = function() {
            start_time = Date.now();
            var param = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
            xhr_send.apply(xhr, param)
        }
        xhr.addEventListener('readystatechange', function() {
            if (4 === xhr.readyState) {
                diff_time = Date.now() - start_time;
                if (xhr.status >= 200 && xhr.status <= 299) {
                    var status = xhr.status || 200;
                    // t.responseType && "text" !== t.responseType ? o.api(c, !0, t, e, "") : i(o, h.parseResponse, c, u, n.responseText, e, t)
                    console.log(status);
                } else {
                    console.log('fail');
                    // o.api(c, !1, t, n.status || "FAILED", n.statusText)
                }
            }
        })
        return xhr;
    }
    window.XMLHttpRequest = xmlHttpNew;
})(window);
