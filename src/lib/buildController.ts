import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

export { buildController };

function buildController<paramsT extends Record<string, string>, bodyT>(
    controller: (params: { urlParams: paramsT; body: bodyT }) => any | Promise<any>,
    options?: {
        schema?: Joi.Schema;
    },
) {
    return async (req: Request, res: Response) => {
        console.log(`${req.method} ${req.originalUrl}`);

        if (options?.schema) {
            const { error } = options.schema.validate(req.body);
            if (error) {
                console.error(error);
                res.status(httpStatus.BAD_REQUEST).send(error.message);
                return;
            }
        }

        try {
            const result = await controller({
                urlParams: req.params as paramsT,
                body: req.body,
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        } catch (error) {
            console.error(error);
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
