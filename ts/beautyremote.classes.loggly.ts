import * as plugins from './beautyremote.plugins'

export class Loggly {
    token: string

    /**
     * the loggly client Data object 
     */
    standardLogData = {
        domainName: 'undefined',
        serverName: 'undefined',
        applicationName: 'undefined',
        message: 'undefined',
        messageType: 'undefined'
    }
    constructor(optionsArg: {
        token: string,
        domainName?: string,
        appName?: string,
        serverName?: string
    }) {
        this.token = optionsArg.token
        this.standardLogData.domainName = optionsArg.domainName
        this.standardLogData.applicationName = optionsArg.appName
        this.standardLogData.serverName = optionsArg.serverName
    }

    log(logType: string, logMessage: string) {
        this.standardLogData.messageType = logType
        this.standardLogData.message = logMessage
        console.log(this.standardLogData)
        this.request('post', this.standardLogData)
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
