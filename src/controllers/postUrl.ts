import { Request, Response } from "express";
import { HashTypes, ShortnerTypes } from "../constants/common";
import { HashServiceInterface } from "../interfaces/HashServiceInterface";
import { ShortnerServiceInterface } from "../interfaces/ShortnerServiceInterface";
import { HashService } from "../services/HashService";
import { ShortnerService } from "../services/ShortnerService";

export default async (req: Request, res: Response) => {
    // Validate the input
    const { url } = req.body;
    // Get hashedString from makeHashService
    const hashService: HashServiceInterface = new HashService();
    const hashedString: string = await hashService.makeHash(url, HashTypes.MD5);
    // Call Shortner Service
    const shortnerService: ShortnerServiceInterface = new ShortnerService();
    const shortString: string = await shortnerService.shorten(hashedString, ShortnerTypes.FiveLengthId);
    console.log(shortString)
    // Call saveToDb Service
    // const db = new DbService();
    // await dbService.save(url)
};