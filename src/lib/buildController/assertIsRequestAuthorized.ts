import { Request } from 'express';
import { config } from '../../config';

function assertIsRequestAuthorized(req: Request) {
    const apiKey = req.header('Api-Key');
    if (!apiKey) {
        throw new Error(`No apiKey provided`);
    }
    if (apiKey !== config.API_KEY) {
        throw new Error(`Invalid ApiKey`);
    }
    return;
}

export { assertIsRequestAuthorized };
