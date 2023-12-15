import Express from 'express';
import Joi from 'joi';
import { buildController } from './lib/buildController';
import { buildScalingoController } from './modules/scalingo';

async function buildRouter() {
    const router = Express.Router();
    const scalingoController = buildScalingoController();

    router.get('/scalingo/apps', buildController(scalingoController.createApp));

    return router;
}

export { buildRouter };
