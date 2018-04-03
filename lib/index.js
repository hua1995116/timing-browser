import performance from './gather/performance';
import error from './gather/error';
import {stringfy} from './utils/index';

const config = {
    pid: '213',
    imgUrl: './sdasd.png',
    level: '0',
    repeat: '5',
}

const w = window['ERROR_CONFIG'];
for (let i in w) {
    config[i] = w[i];
}

(new Image()).src = `${config.imgUrl}?t=perf&${stringfy(performance())}`;
error(config);
