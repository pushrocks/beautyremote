import * as plugins from './beautyremote.plugins'

export class Loggly {
    logglyClient: plugins.loggly.LogglyInstance
    
    /**
     * the loggly client Data object 
     */
    clientData = {
        serverName: 'myServer',
        applicationName: 'myApp',
        message: 'undefined',
        messageType: 'undefined'
    }
    constructor(optionsArg: {
        token: string,
        subdomain: string,
        appName: string,
        serverName: string
    }) {
        this.logglyClient = plugins.loggly.createClient({
            token: optionsArg.token,
            subdomain: optionsArg.subdomain,
            tags: [],
            json: true
        })
        clientData.applicationName = optionsArg.appName
        clientData.serverName = optionsArg.serverName
    }

    log(logType: string, logMessage: string) {
        clientData.messageType = logType
        clientData.message = logMessage

        this.logglyClient.log(clientData)
    }
}
