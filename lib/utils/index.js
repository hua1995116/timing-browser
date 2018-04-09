function errorPost(url, data) {
    var http = new XMLHttpRequest;
    http.open("POST", url, !0),
        http.setRequestHeader("Content-Type", "text/plain"),
        http.send(data);
}

function stringfy(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    const arr = Object.keys(obj).map((item) => item + '=' + obj[item]);
    return arr.join('&');
}

function extend(src) {
    let arg = arguments;
    if (arg.length >= 2) {
        for (let i = 1, len = arg.length; i < len; i++) {
            for (let key in arg[i]) {
                src[key] = arg[i][key];
            }
        }
    }
    return src;
}

export {
    errorPost,
    stringfy,
    extend
};