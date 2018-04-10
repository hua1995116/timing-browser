import {errorPost,extend,stringfy} from '../utils/index';
import {setItem} from '../utils/cache';
import setGrade from '../utils/level';
import info from '../utils/info';
import filter from '../utils/filter';

let config = {};

function errorhandler(e) {
    if (!config.client) {
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
        if (filter(errorObj) || setGrade(errorObj.msg, config.level) ||setItem(errorObj.stack, config.repeat)){
            return;
        }
    }
    const exportData = extend(errorObj, info, {
        client: config['client'],
        version: config['version']
    });
    // errorPost(`${config.imgUrl}`, JSON.stringify(exportData));
    (new Image()).src = `${config.imgUrl}?${stringfy(exportData)}`;
}

function error(co) {
    config = co;
    const storage = window._error_storage_;
    if (storage.length > 0) {
        storage.map((item, index) => errorhandler(storage[index][0]) );
    }
    window.addEventListener && window.addEventListener("error", errorhandler);
}

export default error;