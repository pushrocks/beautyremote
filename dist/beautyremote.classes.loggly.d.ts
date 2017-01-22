export declare class Loggly {
    token: string;
    /**
     * the loggly client Data object
     */
    clientData: {
        domainName: string;
        serverName: string;
        applicationName: string;
        message: string;
        messageType: string;
    };
    constructor(optionsArg: {
        token: string;
        domainName: string;
        appName: string;
        serverName: string;
    });
    log(logType: string, logMessage: string): void;
    logData(dataArg: any): void;
    private request(methodArg, dataArg?);
}
