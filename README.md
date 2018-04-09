# 前端监控-浏览器端


## 浏览器端
```
<script>
!function(e){e._error_storage_=[],e.ERROR_CONFIG={client:"",imgUrl:""},e.addEventListener&&e.addEventListener("error",function(){e._error_storage_&&e._error_storage_.push([].slice.call(arguments))},!0);var r=3;setTimeout(function e(){var t=document.createElement("script");t.async=!0,t.src="http://www.huayifeng.top:3000/javascripts/timing.js",t.crossOrigin="anonymous",t.onerror=function(){--r>0&&setTimeout(e,1500)},document.head&&document.head.appendChild(t)},1500)}(window);
</script>
```
将以上代码复制到浏览器```</head>```上方。

## 运行 

```
npm run build 
```
打包成timing.js 用于异步加载统计

## 说明

export interface config {
    client: string; // 项目上报id
    imgUrl: string; // 请求url
    level: Number; // 等级
    repeat: Number; // 重复上报次数
    ignore: Array<RegExp | Function>; // 过滤条件
}
