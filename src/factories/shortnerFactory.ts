import { ShortnerTypes } from "../constants/common";
import fiveLengthId from "../utils/shortners/fiveLengthId";

export default (type: ShortnerTypes): Function => {
    // Method to perform MD5 Hashing for the given string
    if (type === ShortnerTypes.FiveLengthId) return fiveLengthId;
    throw new Error('Method is not defined');
};
