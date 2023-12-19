import Express from 'express';
import Joi from 'joi';
import { buildController } from './lib/buildController';
import { buildScalingoController } from './modules/scalingo';

async function buildRouter() {
    const router = Express.Router();
    const scalingoController = buildScalingoController();

    router.post(
        '/scalingo/apps',
        buildController(scalingoController.createApp, {
            schema: Joi.object({
                appName: Joi.string()
                    .regex(/^[a-z][a-z\-]{4,46}[a-z]$/)
                    .required(),
                shouldBeSecNumCloud: Joi.boolean().required(),
                collaboratorToInvite: Joi.string().email(),
            }),
        }),
    );

    return router;
}

export { buildRouter };
