import axios from 'axios';
import { config } from '../../config';

const SCALINGO_AUTH_BASE_URL = 'https://auth.scalingo.com/v1';

function buildScalingoService() {
    return {
        createApp,
    };

    async function createApp(body: {
        appName: string;
        shouldBeSecNumCloud: boolean;
        collaboratorToInvite: string;
    }) {
        const bearerToken = await requestBearerToken();
        const APP_CREATION_URL = getSpecificRegionUrl('/v1/apps', body.shouldBeSecNumCloud);
        await axios
            .post(
                APP_CREATION_URL,
                { app: { name: body.appName } },
                { headers: { Authorization: `Bearer ${bearerToken}` } },
            )
            .then((response) => response.data);

        const COLLABORATOR_INVITATION_URL = getSpecificRegionUrl(
            `/v1/apps/${body.appName}/collaborators`,
            body.shouldBeSecNumCloud,
        );

        await axios
            .post(
                COLLABORATOR_INVITATION_URL,
                {
                    collaborator: { email: body.collaboratorToInvite },
                },
                { headers: { Authorization: `Bearer ${bearerToken}` } },
            )
            .then(({ data }) => data);

        return true;
    }

    async function requestBearerToken(): Promise<string> {
        const SCALINGO_BEARER_TOKEN_URL = `${SCALINGO_AUTH_BASE_URL}/tokens/exchange`;
        const data = await axios
            .post(
                SCALINGO_BEARER_TOKEN_URL,
                {},
                { auth: { username: '', password: config.SCALINGO_TOKEN } },
            )
            .then(({ data }) => data);
        return data.token;
    }

    function getSpecificRegionUrl(urlSuffix: string, isSecnumCloud: boolean) {
        const SCALINGO_APPS_FR_ENDPOINT = 'api.osc-fr1.scalingo.com';
        const SCALINGO_APPS_SECNUM_ENDPOINT = 'api.osc-secnum-fr1.scalingo.com';
        if (isSecnumCloud) {
            return `https://${SCALINGO_APPS_SECNUM_ENDPOINT}${urlSuffix}`;
        }
        return `https://${SCALINGO_APPS_FR_ENDPOINT}${urlSuffix}`;
    }
}

export { buildScalingoService };
