import { buildScalingoService } from './scalingo.service';

function buildScalingoController() {
    const scalingoService = buildScalingoService();
    return {
        createApp,
        renameApp,
    };

    function createApp(params: {
        body: { appName: string; shouldBeSecNumCloud: boolean; collaboratorToInvite: string };
    }) {
        return scalingoService.createApp(params.body);
    }

    function renameApp(params: {
        body: {
            isSecNumCloud: boolean;
            previousAppName: string;
            newAppName: string;
        };
    }) {
        return scalingoService.renameApp(params.body);
    }
}

export { buildScalingoController };
