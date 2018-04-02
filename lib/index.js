import performance from './gather/performance';
import useragent from './gather/useragent';
import error from './gather/error';
import config from './config';
import {stringfy} from './utils/index';

console.log(performance());
console.log(useragent());

(new Image()).src = `${config.perfUrl}?${stringfy(performance())}`;

(new Image()).src = `${config.user}?${stringfy(useragent())}`;


error();
