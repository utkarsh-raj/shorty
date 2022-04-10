import express, { Express, Request, Response } from 'express';
import postUrl from '../../controllers/postUrl';
import getUrl from '../../controllers/getUrl';

const app: Express = express();

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send({
        status: "Healthy",
        services: {
            "database": {
                status: "Healthy",
                reason: "NA"
            },
            "api": {
                status: "Healthy",
                reason: "NA"
            }
        }
    })
});


app.get('/:shortUrl', getUrl);
app.post('/url', postUrl);

export default app;