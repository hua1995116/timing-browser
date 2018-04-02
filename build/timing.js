!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=8)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.errorPost=function(e,t){var r=new XMLHttpRequest;r.open("POST",e,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(t)},t.stringfy=function(e){if(e&&"object"===(void 0===e?"undefined":n(e)))return Object.keys(e).map(function(t){return t+"="+e[t]}).join("&")},t.extend=function(e,t){for(var r in t)e[r]=t[r];return e}},,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={perfUrl:"./perf",error:"./error",user:"./user"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e,t=navigator.userAgent,r="",n="",o="Unknown",i=t.match(/(ipod).*\s([\d_]+)/i),a=t.match(/(ipad).*\s([\d_]+)/i),u=t.match(/(iphone)\sos\s([\d_]+)/i),c=t.match(/(android)\s([\d\.]+)/i);c?o="Android "+c[2]:u?o="iPhone, iOS "+u[2].replace(/_/g,"."):a?o="iPad, iOS "+a[2].replace(/_/g,"."):i&&(o="iPod, iOS "+i[2].replace(/_/g,"."));var s=o,l=t.match(/MicroMessenger\/([\d\.]+)/i);return o="Unknown",l&&l[1]&&(s+=", WeChat "+(o=l[1])),e=s,o="Unknown",s=o="https:"==location.protocol?"HTTPS":"http:"==location.protocol?"HTTP":location.protocol.replace(":",""),o="Unknown",(n=t.toLowerCase().match(/ nettype\/([^ ]+)/g))&&n[0]?n=s+=", "+(o=(n=n[0].split("/"))[1]):r=s,{system:e,ua:t,protocol:r,network:n}}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.has=u,t.getItem=c,t.setItem=function(e){if(Object.keys(i).length>=10&&l(),u(e)){var t=c(e);if(t>=5)return!0;i[e]={value:t+1,time:Date.now()}}else i[e]={value:1,time:Date.now()};return a(),!1},t.removeItem=s,t.clear=l;var n="FE_TIMING",o=window.localStorage,i=void 0;function a(){try{i?o.setItem(n,JSON.stringify(i)):i=JSON.parse(o.getItem(n)||"{}")}catch(e){console.log(e)}}function u(e){return Object.hasOwnProperty.call(i,e)}function c(e){if(!u(e))return!1;var t=i[e]||{},r=t.value;return t.time,r}function s(e){u(e)&&(delete i[e],a())}function l(){var e=null,t=Number.MAX_SAFE_INTEGER;for(var r in i){var n=i[r]||{},o=n.value,a=n.time;if(new Date-a>144e4)return void s(r);+a<t&&(t=o,e=r)}s(e)}a()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(0),i=r(4),a=(n=r(3))&&n.__esModule?n:{default:n};function u(e){var t;(t=e.target!=window?{target:e.target.localName,type:e.type,resourceUrl:e.target.currentSrc||e.target.src,pageUrl:location.href}:{target:"window",msg:e.message,url:e.filename,line:e.lineno,col:e.colno,error:e.stack||(e.error?e.error.stack:void 0),pageUrl:location.href}).error&&(0,i.setItem)(t.error)||(0,o.errorPost)("./error",JSON.stringify((0,o.extend)(t,a.default)))}t.default=function(){if(window._error_storage_.length>0)for(var e=window._error_storage_,t=e.length,r=0;r<t;r++)u(e[r][0]);window.addEventListener&&window.addEventListener("error",u)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return{sr:window.screen.height+"x"+window.screen.width,dp:window.devicePixelRatio}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=["","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart","responseStart","responseEnd","","domInteractive","","domContentLoadedEventEnd","","loadEventStart","","msFirstPaint","secureConnectionStart"],t={dns:[3,2],tcp:[5,4],ssl:[5,17],ttfb:[7,6],trans:[8,7],dom:[10,8],res:[14,12],firstbyte:[7,2],fpt:[8,1],tti:[10,1],ready:[12,1],load:[14,1]},r={},n=(window.performance||window.msPerformance||window.webkitPerformance).timing;return Object.keys(t).map(function(o){var i=n[e[t[o][0]]],a=n[e[t[o][1]]],u=Math.round(i-a);u>=0&&u<36e5&&(r[o]=u)}),r}},function(e,t,r){"use strict";var n=c(r(7)),o=c(r(6)),i=c(r(5)),a=c(r(2)),u=r(0);function c(e){return e&&e.__esModule?e:{default:e}}console.log((0,n.default)()),console.log((0,o.default)()),(new Image).src=a.default.perfUrl+"?"+(0,u.stringfy)((0,n.default)()),(new Image).src=a.default.user+"?"+(0,u.stringfy)((0,o.default)()),(0,i.default)()}]);