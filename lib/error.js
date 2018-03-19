import {errorPost} from './utils/index';
function error() {
    if(window._error_storage_.length > 0) {
        const storage = window._error_storage_;
        const len = storage.length;
        for(let i = 0; i < len; i++) {
            errorhandler(storage[i][0]);
        }
    }
    window.addEventListener && window.addEventListener("error", errorhandler);
}

function errorhandler(e) { 
    let errorObj = {};
    if(e.target != window) {
        errorObj = {
            target: e.target.localName,
            type: e.type,
            resourceUrl:e.target.currentSrc || e.target.src,
            pageUrl:location.href,
        };
    }  else {
        errorObj = {
            target: 'window',
            msg: e.message,
            url: e.filename,
            line: e.lineno,
            col: e.colno,
            error: e.stack || (e.error ? e.error.stack: void 0),
            pageUrl: location.href
        }
    }
    errorPost('./error', JSON.stringify(errorObj));
}

export default error;