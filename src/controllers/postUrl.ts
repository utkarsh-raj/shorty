import { Request, Response } from "express";
import { DbEngineTypes, HashTypes, ShortenerTypes } from "../constants/common";
import { UrlShortner } from "../services/UrlShortner";

export default async (req: Request, res: Response) => {
    // Validate the input
    const { url } = req.body;
    const urlShortener = new UrlShortner();
    const shortUrl: string = await urlShortener.process(
        url,
        HashTypes.MD5,
        ShortenerTypes.FiveLengthId,
        DbEngineTypes.MongoDB
    );
    return res.status(200).send({
        status: 'success',
        short_url: shortUrl,
        original_url: url
    });
};
