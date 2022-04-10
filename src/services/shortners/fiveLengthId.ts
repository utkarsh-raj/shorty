export default (hash: string) => {
    const moment = require("moment");
    const Hashids = require('hashids');
    const hashids = new Hashids(moment().valueOf() + String(Math.random()));
    const encodedString: string = hashids.encode(hash.replace(/\D/g, '').split(''));
    return encodedString.length < 6 ? encodedString : encodedString.slice(0, 5);
};
