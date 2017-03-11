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
        this.request(this.standardLogData).catch(err => {
            console.log(err);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvYmVhdXR5cmVtb3RlLmNsYXNzZXMubG9nZ2x5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWlEO0FBRWpEO0lBYUUsWUFBWSxVQUtYO1FBZkQ7O1dBRUc7UUFDSCxvQkFBZSxHQUFHO1lBQ2hCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLGVBQWUsRUFBRSxXQUFXO1lBQzVCLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUE7UUFPQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUE7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQTtRQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7SUFDekQsQ0FBQztJQUVELEdBQUcsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFBO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQTtRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRztZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFPO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU8sT0FBTyxDQUFDLE9BQU8sR0FBRyxFQUFFO1FBQzFCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDNUIsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3QyxJQUFJLE9BQU8sR0FBRztZQUNaLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7WUFDRCxXQUFXLEVBQUUsT0FBTztTQUNyQixDQUFBO1FBQ0QsdUJBQXVCO1FBQ3ZCLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxJQUFJLENBQUMsS0FBSyxZQUFZLEVBQUUsT0FBTyxDQUFDO2FBQzdGLElBQUksQ0FBQyxDQUFDLEdBQVE7WUFDYixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDM0IsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztDQUNGO0FBekRELHdCQXlEQyJ9