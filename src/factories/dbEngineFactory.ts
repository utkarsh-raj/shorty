import { DbEngineTypes } from "../constants/common";
import { DbServiceInterface } from "../interfaces/DbServiceInterface";
import { MongoDBService } from "../services/DbEngines/MongoDB.service";

export default (type: DbEngineTypes): DbServiceInterface => {
    // Method to perform MD5 Hashing for the given string
    if (type === DbEngineTypes.MongoDB) return new MongoDBService();
    throw new Error('Method is not defined');
};
