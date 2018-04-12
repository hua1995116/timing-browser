import error from './gather/error';
import {stringfy} from './utils/index';
import {extend} from './utils/index';

let config = {
    client: '',
    imgUrl: '',
    level: '0',
    repeat: '5',
    version: '0.0.1',
}

config = extend(config, window['ERROR_CONFIG']);

error(config);
