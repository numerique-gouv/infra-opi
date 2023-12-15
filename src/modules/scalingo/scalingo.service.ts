function buildScalingoService() {
    return {
        createApp,
    };

    async function createApp() {
        return true;
    }
}

export { buildScalingoService };
