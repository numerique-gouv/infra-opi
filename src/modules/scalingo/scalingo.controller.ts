import { buildScalingoService } from './scalingo.service';

function buildScalingoController() {
    const scalingoService = buildScalingoService();
    return {
        createApp,
    };

    function createApp(params: {
        body: { appName: string; shouldBeSecNumCloud: boolean; collaboratorToInvite: string };
    }) {
        return scalingoService.createApp(params.body);
    }
}

export { buildScalingoController };
