import { Request, Response } from "express";
import { DbEngineTypes } from "../constants/common";
import { UrlShortnerInterface } from "../interfaces/UrlShortnerInterface";
import { UrlShortner } from "../services/UrlShortner";

export default async (req: Request, res: Response) => {
    // Validate the input
    const { shortUrl } = req.params;
    const urlShortener: UrlShortnerInterface = new UrlShortner();
    const redirectionUrl: string = await urlShortener.getRedirectionUrl(
        shortUrl,
        DbEngineTypes.MongoDB
    );
    return res.status(302).redirect(redirectionUrl);
};
