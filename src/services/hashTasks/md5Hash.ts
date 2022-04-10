export default (data: string) => {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
};
