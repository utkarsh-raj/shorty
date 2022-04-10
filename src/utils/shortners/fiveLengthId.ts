export default (hash: string) => {
    const Hashids = require('hashids');
    const hashids = new Hashids(new Date().toString());
    const encodedString: string = hashids.encode(hash.replace(/\D/g, '').split(''));
    return encodedString.length < 6 ? encodedString : encodedString.slice(0, 5);
};
