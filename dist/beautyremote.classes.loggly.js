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
        this.request('post', this.standardLogData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBaUQ7QUFFakQ7SUFhSSxZQUFZLFVBS1g7UUFmRDs7V0FFRztRQUNILG9CQUFlLEdBQUc7WUFDZCxVQUFVLEVBQUUsV0FBVztZQUN2QixVQUFVLEVBQUUsV0FBVztZQUN2QixlQUFlLEVBQUUsV0FBVztZQUM1QixPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsV0FBVztTQUMzQixDQUFBO1FBT0csSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFBO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQTtRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFBO0lBQzNELENBQUM7SUFFRCxHQUFHLENBQUMsT0FBZSxFQUFFLFVBQWtCO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQTtRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUE7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBTztRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFTyxPQUFPLENBQUMsU0FBaUIsRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUMzQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLElBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDN0MsSUFBSSxPQUFPLEdBQUc7WUFDVixNQUFNLEVBQUUsU0FBUztZQUNqQixHQUFHLEVBQUUsbUNBQW1DLElBQUksQ0FBQyxLQUFLLFlBQVk7WUFDOUQsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7YUFDckM7WUFDRCxJQUFJLEVBQUUsT0FBTztTQUNoQixDQUFBO1FBQ0QsdUJBQXVCO1FBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUM3QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNwQixDQUFDO1lBQUEsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztDQUNKO0FBM0RELHdCQTJEQyJ9