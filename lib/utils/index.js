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
    const arr = Object.keys(obj).map((item) => item+'='+obj[item]);
    return arr.join('&');
}

export {
    errorPost,
    stringfy
};