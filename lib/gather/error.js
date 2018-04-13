import {
    errorPost,
    extend,
    stringfy
} from '../utils/index';
import {
    setItem
} from '../utils/cache';
import setGrade from '../utils/level';
import info from '../utils/info';
import filter from '../utils/filter';

let config = {};

function errorhandler(e) {
    if (!config.client || !config.imgUrl) {
        return;
    }
    let errorObj = {};

    if (e.target != window) {
        let copye = e;
        e = e.target ? e.target : e.srcElement;
        let out = e && e.outerHTML;
        out && out.length > 200 && (out = out.slice(0, 200));
        errorObj = {
            target: 'resourceError',
            type: copye.type || 'unknown',
            file: encodeURIComponent(e.currentSrc || e.src),
            page: encodeURIComponent(location.href),
            outerHTML: encodeURIComponent(out),
            tagName: e && e.tagName,
            id: e.id || 'null',
            className: e.className || 'null',
            path: findPath(e),
            selector: findSelector(e),
            errorKey: encodeURIComponent(compressString(out, findPath(e))),
        };
    } else {
        const ErrTypeReg = /Uncaught\s(\S*):/i;
        const type = e.message.match(ErrTypeReg);
        errorObj = {
            target: 'scriptError',
            msg: e.message,
            file: encodeURIComponent(e.filename),
            line: e.lineno,
            col: e.colno,
            stack: e.stack || (e.error ? e.error.stack : void 0),
            page: encodeURIComponent(location.href),
            type: type && type[1],
            errorKey: compressString(String(e.message), String(e.colno) + String(e.lineno)),
        }
        if (filter(errorObj) || setGrade(errorObj.msg, config.level) || setItem(errorObj.stack, config.repeat)) {
            return;
        }
    }
    const exportData = extend({
        client: config['client'],
        version: config['version'],
        key: `${+new Date()}@${randomString(8)}`,
        pageId: config['pageId']
    }, errorObj, info);
    // errorPost(`${config.imgUrl}`, JSON.stringify(exportData));
    (new Image()).src = `${config.imgUrl}${stringfy(exportData)}`;
}

function compressString(str, key) {
    if (!str || !key) {
        return 'null';
    }
    let n = 0,
        m = 0;
    for (let i = 0; i < str.length; i++) {
        n += str.charCodeAt();
    }
    for (let i = 0; i < key.length; i++) {
        m += str.charCodeAt();
    }
    let num = n + key[key.length - 1] + m + str[str.length - 1];
    return num;
}

function randomString(len) {　　
    len = len || 32;
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = chars.length;
    let pwd = '';　　
    for (let i = 0; i < len; i++) {　　　　
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));　　
    }　　
    return pwd;
}

function error(co) {
    config = co;
    const storage = window._error_storage_;
    if (storage.length > 0) {
        storage.map((item, index) => errorhandler(storage[index][0]));
    }
    window.addEventListener && window.addEventListener("error", errorhandler, true);
}

function findPath(e) {
    let arr;
    for (arr = []; e && e.nodeType == Node.ELEMENT_NODE; e = e.parentNode) {
        let node, index = 0,
            isfind = false;
        for (node = e.previousSibling; node; node = node.previousSibling)
            node.nodeType != Node.DOCUMENT_TYPE_NODE && node.nodeName == e.nodeName && ++index;
        for (node = e.nextSibling; node && !isfind; node = node.nextSibling)
            node.nodeName == e.nodeName && (isfind = true);
        let name = (e.prefix ? e.prefix + ":" : "") + e.localName,
            local = index || isfind ? "[" + (index + 1) + "]" : "";
        arr.splice(0, 0, name + local)
    }
    return arr.length ? "/" + arr.join("/") : null
}

function findSelector(e) {
    let arr;
    for (arr = []; e.parentNode;) {
        if (e.id) {
            arr.unshift("#" + e.id);
            break
        }
        if (e == e.ownerDocument.documentElement)
            arr.unshift(e.tagName);
        else {
            let index = 1;
            for (let node = e; node.previousElementSibling; node = node.previousElementSibling, index++);
            arr.unshift(e.tagName + ":nth-child(" + index + ")")
        }
        e = e.parentNode
    }
    return arr.join(" > ");
}


export default error;