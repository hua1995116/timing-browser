// 获取基本信息
const info = (function() {
    let system = '', // 系统版本
      mobile = '',  // 机型
      ua = navigator.userAgent, //用户代理
      protocol = '', //协议(HTTP/HTTPS)
      network = ''; //网络
  
    let logMsg = 'Unknown'; 
    //设备检测
    let ipod = ua.match(/(ipod).*\s([\d_]+)/i),
      ipad = ua.match(/(ipad).*\s([\d_]+)/i),
      iphone = ua.match(/(iphone)\sos\s([\d_]+)/i),
      android = ua.match(/(Android\s\S*)(\szh-cn;|\szh-CN;)?\s?((\S*)\s(\S*\s\S*)|(\w*)-(\w*)|(\S*)\s(\S*))\sBuild/i);
  
    if (android && android.length > 2) {
      logMsg = android[1].replace(';', '') + ',' + android[3];
    } else if (iphone) {
      logMsg = 'iPhone,iOS ' + iphone[2].replace(/_/g, '.');
    } else if (ipad) {
      logMsg = 'iPad,iOS ' + ipad[2].replace(/_/g, '.');
    } else if (ipod) {
      logMsg = 'iPod,iOS ' + ipod[2].replace(/_/g, '.');
    }
    
    let logList = logMsg.split(',');
    system = logList[0];
    mobile = logList[1]; 

    logMsg = 'Unknown';
    if (location.protocol == 'https:') {
      logMsg = 'HTTPS';
    } else if (location.protocol == 'http:') {
      logMsg = 'HTTP';
    } else {
      logMsg = location.protocol.replace(':', '');
    }
    let templogMsg = logMsg;
  
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
  
    const time = new Date().toISOString();
    
    return {
      system,
      mobile,
      ua,
      protocol,
      network,
      time
    }
})();
  
export default info;