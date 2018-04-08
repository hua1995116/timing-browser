import {errorPost,extend} from '../utils/index';
import {setItem} from './cache';
import setGrade from './level';
import info from '../utils/info';
import filter from './filter';

let config = {};

function errorhandler(e) {
    if (!config.pid) {
        return;
    }
    let errorObj = {};

    if (e.target != window) {
        errorObj = {
            target: e.target.localName,
            type: e.type,
            file: e.target.currentSrc || e.target.src,
            page: location.href,
        };
    } else {
        const ErrTypeReg = /Uncaught\s(\S*):/i;
        const type = e.message.match(ErrTypeReg);
        errorObj = {
            target: 'window',
            msg: e.message,
            file: e.filename,
            line: e.lineno,
            col: e.colno,
            stack: e.stack || (e.error ? e.error.stack : void 0),
            page: location.href,
            type: type && type[1]
        }
        if (filter(errorObj)) {
            return;
        }

        if (setGrade(errorObj.msg, config.level)) {
            return;
        }

        if (setItem(errorObj.stack, config.repeat)) {
            return;
        }
    }

    errorPost(`${config.imgUrl}`, JSON.stringify(extend(errorObj, info)));
}

function error(co) {
    config = co;
    const storage = window._error_storage_;
    if (storage.length > 0) {
        for (let i = 0, len = storage.length; i < len; i++) {
            errorhandler(storage[i][0]);
        }
    }
    window.addEventListener && window.addEventListener("error", errorhandler);
}

export default error;