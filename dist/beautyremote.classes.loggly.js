"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBaUQ7QUFFakQ7SUFhSSxZQUFZLFVBS1g7UUFmRDs7V0FFRztRQUNILG9CQUFlLEdBQUc7WUFDZCxVQUFVLEVBQUUsV0FBVztZQUN2QixVQUFVLEVBQUUsV0FBVztZQUN2QixlQUFlLEVBQUUsV0FBVztZQUM1QixPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsV0FBVztTQUMzQixDQUFBO1FBT0csSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFBO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQTtRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFBO0lBQzNELENBQUM7SUFFRCxHQUFHLENBQUMsT0FBZSxFQUFFLFVBQWtCO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQTtRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUE7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFPO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRU8sT0FBTyxDQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ3hCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDNUIsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3QyxJQUFJLE9BQU8sR0FBRztZQUNWLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7YUFDckM7WUFDRCxXQUFXLEVBQUUsT0FBTztTQUN2QixDQUFBO1FBQ0QsdUJBQXVCO1FBQ3ZCLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxJQUFJLENBQUMsS0FBSyxZQUFZLEVBQUUsT0FBTyxDQUFDO2FBQzNGLElBQUksQ0FBQyxDQUFDLEdBQVE7WUFDWCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDN0IsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztDQUNKO0FBdkRELHdCQXVEQyJ9