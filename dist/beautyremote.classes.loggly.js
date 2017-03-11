"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./beautyremote.plugins");
class Loggly {
    constructor(optionsArg) {
        /**
         * the loggly client Data object
         */
        this.standardLogData = {
            domainName: 'undefined',
            serverName: 'undefined',
            applicationName: 'undefined',
            message: 'undefined',
            messageType: 'undefined'
        };
        this.token = optionsArg.token;
        this.standardLogData.domainName = optionsArg.domainName;
        this.standardLogData.applicationName = optionsArg.appName;
        this.standardLogData.serverName = optionsArg.serverName;
    }
    log(logType, logMessage) {
        this.standardLogData.messageType = logType;
        this.standardLogData.message = logMessage;
        this.request(this.standardLogData);
    }
    logData(dataArg) {
        this.request(dataArg);
    }
    request(dataArg = {}) {
        let done = plugins.q.defer();
        let jsonArg = JSON.stringify(dataArg);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            requestBody: jsonArg
        };
        // console.log(options)
        plugins.smartrequest.request(`https://logs-01.loggly.com/bulk/${this.token}/tag/bulk/`, options)
            .then((res) => {
            if (res.statusCode === 200) {
                let responseObj = res.body;
                done.resolve(responseObj);
            }
        });
        return done.promise;
    }
}
exports.Loggly = Loggly;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWlEO0FBRWpEO0lBYUUsWUFBWSxVQUtYO1FBZkQ7O1dBRUc7UUFDSCxvQkFBZSxHQUFHO1lBQ2hCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLGVBQWUsRUFBRSxXQUFXO1lBQzVCLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUE7UUFPQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUE7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQTtRQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7SUFDekQsQ0FBQztJQUVELEdBQUcsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFBO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQTtRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQU87UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTyxPQUFPLENBQUMsT0FBTyxHQUFHLEVBQUU7UUFDMUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM1QixJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzdDLElBQUksT0FBTyxHQUFHO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELFdBQVcsRUFBRSxPQUFPO1NBQ3JCLENBQUE7UUFDRCx1QkFBdUI7UUFDdkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUNBQW1DLElBQUksQ0FBQyxLQUFLLFlBQVksRUFBRSxPQUFPLENBQUM7YUFDN0YsSUFBSSxDQUFDLENBQUMsR0FBUTtZQUNiLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUMzQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0NBQ0Y7QUF2REQsd0JBdURDIn0=