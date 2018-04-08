function filter(e) {
    if(e.url === e.pageUrl && e.line === 1) {
        return true;
    }
    return false;
}

export default filter;