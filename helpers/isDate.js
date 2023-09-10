const datefns = require('date-fns');

const isDate = ( value, { req, location, path }) => {
    if(!value) return false;

    const isValid = datefns.isValid(value);

    if(!isValid) return false;

    return true;
}

module.exports = {
    isDate
}