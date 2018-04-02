const KEY = 'FE_TIMING'
const localStorage = window.localStorage
let storeStorage

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

export function setItem(key) {
    if (Object.keys(storeStorage).length >= 10) {
        clear();
    }
    if (has(key)) {
        const value = getItem(key);
        if (value >= 5) {
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
    let current = null;
    let times = Number.MAX_SAFE_INTEGER;
    for(let item in storeStorage) {
        const {value, time} = storeStorage[item] || {};
        if(new Date() - time > 1000 * 60 * 24 ) {
            removeItem(item);
            return;
        }
        if(+time < times) {
            times = value;
            current = item;
        }
    }
    removeItem(current);
}