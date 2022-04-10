import { ShortenerTypes } from "../constants/common";
import fiveLengthId from "../services/shortners/fiveLengthId";

export default (type: ShortenerTypes): Function => {
    // Method to perform MD5 Hashing for the given string
    if (type === ShortenerTypes.FiveLengthId) return fiveLengthId;
    throw new Error('Method is not defined');
};
