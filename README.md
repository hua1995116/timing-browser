# 前端监控-浏览器端


## 浏览器端
```
<script>
! function () {
    window._error_storage_ = [], window.addEventListener && window.addEventListener("error", function () {
        window._error_storage_ && window._error_storage_.push([].slice.call(arguments))
    }, !0);
    var e = 3;
    setTimeout(function n() {
        var r = document.createElement("script");
        r.async = !0, r.src = "http://oys4ga3zg.bkt.clouddn.com/timing.js", r.crossOrigin = "anonymous", r.onerror = function () {
            --e > 0 && setTimeout(n, 1500)
        }, document.head && document.head.appendChild(r)
    }, 1500)
}();
</script>
```
将以上代码复制到浏览器```</head>```上方。

## 运行 

```
npm run build 
```
打包成timing.js 用于异步加载统计

## 说明

lib/config 

```
const config = {
    'perfUrl': './perf',  // 性能URL
    'error': './error',  // error URL
    'user': './user',  用户信息 URL
}

export default config;
```
