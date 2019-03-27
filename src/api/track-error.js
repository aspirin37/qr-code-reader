const trackError = error => {
    if (window.appInsights) {
        const metaData = {
            url: error.config.url,
            method: error.config.method,
        };

        if (error.response) {
            metaData.status = error.response.status || 'unknown';
            metaData.statusText = error.response.statusText;

            if (error.response.data.Error) {
                metaData.serverMessage = error.response.data.Error.message;
            }
        } else {
            metaData.clientMessage = error.message;
        }

        window.appInsights.trackException(error, 'API handler', metaData);
    }
};

export default trackError;
