// var xhrd = 'XMLHttpRequest';
(function(w) {
    var Oldxhr = window.XMLHttpRequest;
    var xmlHttpNew = function() {
        var xhr = Oldxhr;
        var t = new xhr();
        var xhr_open = t.open;
        var xhr_send = t.send;
        var start_time, end_time, diff_time;
        t.open = function() {
            var a = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
            xhr_open.apply(t, a);
        }
        t.send = function() {
            start_time = Date.now();
            var agu = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
            xhr_send.apply(t, agu)
        }
        t.addEventListener('readystatechange', function() {
            if (4 === t.readyState) {
                var diff_time = Date.now() - start_time;
                if (t.status >= 200 && t.status <= 299) {
                    var e = t.status || 200;
                    // t.responseType && "text" !== t.responseType ? o.api(c, !0, t, e, "") : i(o, h.parseResponse, c, u, n.responseText, e, t)
                    console.log(1);
                } else {
                    console.log(2);
                    // o.api(c, !1, t, n.status || "FAILED", n.statusText)
                }
            }
        })
        return t;
    }
    XMLHttpRequest = window.XMLHttpRequest = xmlHttpNew;
    // window.XMLHttpRequest = xmlHttpNew;
})(window);

// window[xhr] =  window['s'];
// console.log(new XMLHttpRequest());
// window[xhr] =  window['__oXMLHttpRequest_'];
// window[xhr] = newhttp;