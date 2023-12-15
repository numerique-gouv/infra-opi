import { buildScalingoService } from './scalingo.service';

function buildScalingoController() {
    const scalingoService = buildScalingoService();
    return {
        createApp,
    };

    function createApp(params: { body: {}; urlParams: {} }) {
        return scalingoService.createApp();
    }
}

export { buildScalingoController };
