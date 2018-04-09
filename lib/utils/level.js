const REG_WARN = /^(warn|warning)/i;

function setGrade(error, level) {
    if(level === 0) {
        if(REG_WARN.exec(error)) {
            return true;
        }
    } 
    return false;
}

export default setGrade;
