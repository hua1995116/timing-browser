const KEY = 'FE_TIMING';
const localStorage = window.localStorage;
const TIMES = 6; // 缓存条数
const EXPIRATION_TIME = 1000 * 60 * 24; // 过期时间
let storeStorage;

function store() {
    try {
        if (!storeStorage) {
            storeStorage = JSON.parse(localStorage.getItem(KEY) || '{}')
        } else {
            localStorage.setItem(KEY, JSON.stringify(storeStorage))
        }
    } catch (e) {
        console.log(e)
    }
}

store()

export function has(key) {
    return Object.hasOwnProperty.call(storeStorage, key)
}

export function getItem(key) {
    if (!has(key)) {
        return false
    }

    const {
        value,
        time
    } = storeStorage[key] || {}

    return value
}

export function setItem(key, repeat) {
    if (Object.keys(storeStorage).length >= TIMES) {
        clear();
    }
    if (has(key)) {
        const value = getItem(key);
        
        if (value >= repeat) {
            return true;
        }
        storeStorage[key] = {
            value: value + 1,
            time: Date.now()
        }
    } else {
        storeStorage[key] = {
            value: 1,
            time: Date.now()
        }
    }
    store()
    return false;
}

export function removeItem(key) {
    if (has(key)) {
        delete storeStorage[key]
        store()
    }
}

export function clear() {
    let expiration = false;
    let current = null;
    let times = Number.MAX_SAFE_INTEGER;
    for(let item in storeStorage) {
        const {value, time} = storeStorage[item] || {};
        if(new Date() - time > EXPIRATION_TIME ) {
            removeItem(item);
            expiration = true;
        }
        if(+time < times) {
            times = value;
            current = item;
        }
    }
    // 如果已经清理了过期时间，则有空位，不需要再次清理
    if(expiration) {
        return;
    }
    removeItem(current);
}