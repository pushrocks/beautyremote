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
    this.request(this.standardLogData).catch(err => {
      console.log(err)
    })
  }

  logData(dataArg) {
    this.request(dataArg)
  }

  private request(dataArg = {}) {
    let done = plugins.q.defer()
    let jsonArg: string = JSON.stringify(dataArg)
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      requestBody: jsonArg
    }
    // console.log(options)
    plugins.smartrequest.request(`https://logs-01.loggly.com/bulk/${this.token}/tag/bulk/`, options)
      .then((res: any) => {
        if (res.statusCode === 200) {
          let responseObj = res.body
          done.resolve(responseObj)
        }
      })
    return done.promise
  }
}
