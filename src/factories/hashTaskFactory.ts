import { HashTypes } from "../constants/common";
import md5Hash from '../services/hashTasks/md5Hash';

export default (type: HashTypes): Function => {
    // Method to perform MD5 Hashing for the given string
    if (type === HashTypes.MD5) return md5Hash;
    throw new Error('Method is not defined');
};
