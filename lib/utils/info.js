// 获取基本信息
var info = (function() {
    var system = '', //系统环境(安卓/IOS/IPAD)
      ua = navigator.userAgent, //用户代理
      protocol = '', //协议(HTTP/HTTPS)
      network = ''; //网络
  
    var logMsg = 'Unknown';
  
    //设备检测
    var ipod = ua.match(/(ipod).*\s([\d_]+)/i),
      ipad = ua.match(/(ipad).*\s([\d_]+)/i),
      iphone = ua.match(/(iphone)\sos\s([\d_]+)/i),
      android = ua.match(/(android)\s([\d\.]+)/i);
  
    if (android) {
      logMsg = 'Android ' + android[2];
    } else if (iphone) {
      logMsg = 'iPhone, iOS ' + iphone[2].replace(/_/g, '.');
    } else if (ipad) {
      logMsg = 'iPad, iOS ' + ipad[2].replace(/_/g, '.');
    } else if (ipod) {
      logMsg = 'iPod, iOS ' + ipod[2].replace(/_/g, '.');
    }
  
    var templogMsg = logMsg;
  
    var version = ua.match(/MicroMessenger\/([\d\.]+)/i);
    logMsg = 'Unknown';
    if (version && version[1]) {
      logMsg = version[1];
      templogMsg += (', WeChat ' + logMsg);
    }
  
    system = templogMsg;
  
    logMsg = 'Unknown';
    if (location.protocol == 'https:') {
      logMsg = 'HTTPS';
    } else if (location.protocol == 'http:') {
      logMsg = 'HTTP';
    } else {
      logMsg = location.protocol.replace(':', '');
    }
    templogMsg = logMsg;
  
    network = ua.toLowerCase().match(/ nettype\/([^ ]+)/g);
    logMsg = 'Unknown';
    if (network && network[0]) {
      network = network[0].split('/');
      logMsg = network[1];
      templogMsg += (', ' + logMsg);
      network = templogMsg;
    } else {
      protocol = templogMsg;
    }
  
    return {
      system,
      ua,
      protocol,
      network
    }
})();
  
export default info;