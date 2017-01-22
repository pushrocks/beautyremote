import * as plugins from './beautyremote.plugins'

export class Loggly {
    token: string

    /**
     * the loggly client Data object 
     */
    clientData = {
        domainName: 'undefined',
        serverName: 'myServer',
        applicationName: 'myApp',
        message: 'undefined',
        messageType: 'undefined'
    }
    constructor(optionsArg: {
        token: string,
        domainName: string,
        appName: string,
        serverName: string
    }) {
        this.token = optionsArg.token
        this.clientData.domainName = optionsArg.domainName
        this.clientData.applicationName = optionsArg.appName
        this.clientData.serverName = optionsArg.serverName
    }

    log(logType: string, logMessage: string) {
        this.clientData.messageType = logType
        this.clientData.message = logMessage
        console.log(this.clientData)
        this.request('post', this.clientData)
    }

    logData(dataArg) {
        this.request('post', dataArg)
    }

    private request(methodArg: string, dataArg = {}) {
        let done = plugins.q.defer()
        let jsonArg: string = JSON.stringify(dataArg)
        let options = {
            method: methodArg,
            url: `https://logs-01.loggly.com/bulk/${this.token}/tag/bulk/`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonArg
        }
        // console.log(options)
        plugins.request(options, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                let responseObj = JSON.parse(body)
                done.resolve(responseObj)
            } else {
                console.log(err)
                console.log(res)
                done.reject(err)
            };
        })
        return done.promise
    }
}
