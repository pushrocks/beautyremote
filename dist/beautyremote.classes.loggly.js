"use strict";
const plugins = require("./beautyremote.plugins");
class Loggly {
    constructor(optionsArg) {
        /**
         * the loggly client Data object
         */
        this.clientData = {
            domainName: 'undefined',
            serverName: 'myServer',
            applicationName: 'myApp',
            message: 'undefined',
            messageType: 'undefined'
        };
        this.token = optionsArg.token;
        this.clientData.domainName = optionsArg.domainName;
        this.clientData.applicationName = optionsArg.appName;
        this.clientData.serverName = optionsArg.serverName;
    }
    log(logType, logMessage) {
        this.clientData.messageType = logType;
        this.clientData.message = logMessage;
        console.log(this.clientData);
        this.request('post', this.clientData);
    }
    logData(dataArg) {
        this.request('post', dataArg);
    }
    request(methodArg, dataArg = {}) {
        let done = plugins.q.defer();
        let jsonArg = JSON.stringify(dataArg);
        let options = {
            method: methodArg,
            url: `https://logs-01.loggly.com/bulk/${this.token}/tag/bulk/`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonArg
        };
        // console.log(options)
        plugins.request(options, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                let responseObj = JSON.parse(body);
                done.resolve(responseObj);
            }
            else {
                console.log(err);
                console.log(res);
                done.reject(err);
            }
            ;
        });
        return done.promise;
    }
}
exports.Loggly = Loggly;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBaUQ7QUFFakQ7SUFhSSxZQUFZLFVBS1g7UUFmRDs7V0FFRztRQUNILGVBQVUsR0FBRztZQUNULFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLGVBQWUsRUFBRSxPQUFPO1lBQ3hCLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUE7UUFPRyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUE7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQTtRQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7SUFDdEQsQ0FBQztJQUVELEdBQUcsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQTtRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFPO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVPLE9BQU8sQ0FBQyxTQUFpQixFQUFFLE9BQU8sR0FBRyxFQUFFO1FBQzNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDNUIsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3QyxJQUFJLE9BQU8sR0FBRztZQUNWLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEdBQUcsRUFBRSxtQ0FBbUMsSUFBSSxDQUFDLEtBQUssWUFBWTtZQUM5RCxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjthQUNyQztZQUNELElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUE7UUFDRCx1QkFBdUI7UUFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQzdCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLENBQUM7WUFBQSxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0NBQ0o7QUE1REQsd0JBNERDIn0=