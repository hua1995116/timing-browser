import {
    errorPost,
    extend
} from '../utils/index';
import {
    setItem
} from './cache';
import setGrade from './level';
import info from '../utils/info';
import filter from './filter';

let config = {};
function error(co) {
    config = co;
    if (window._error_storage_.length > 0) {
        const storage = window._error_storage_;
        const len = storage.length;
        for (let i = 0; i < len; i++) {
            errorhandler(storage[i][0]);
        }
    }
    window.addEventListener && window.addEventListener("error", errorhandler);
}

function errorhandler(e) {
    if(!config.pid) {
        return;
    }
    let errorObj = {};
    if (e.target != window) {
        errorObj = {
            target: e.target.localName,
            type: e.type,
            resourceUrl: e.target.currentSrc || e.target.src,
            pageUrl: location.href,
        };
    } else {
        errorObj = {
            target: 'window',
            msg: e.message,
            url: e.filename,
            line: e.lineno,
            col: e.colno,
            error: e.stack || (e.error ? e.error.stack : void 0),
            pageUrl: location.href
        }
        if(filter(errorObj)) {
            return;
        }
        if(setGrade(errorObj.error, config.level)) {
            return;
        }
        if (setItem(errorObj.error, config.repeat)) {
            return;
        }
    }
    errorPost(`${config.imgUrl}`, JSON.stringify(extend(errorObj, info)));
}

export default error;