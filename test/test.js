"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-test");
const beautyremote = require("../dist/index");
/**
 * set up env vars
 */
const qenv_1 = require("qenv");
let testQenv = new qenv_1.Qenv(process.cwd(), process.cwd() + '/.nogit');
describe('beautyremote', function () {
    let myLoggly = new beautyremote.Loggly({
        token: process.env.LOGGLY_TOKEN,
        domainName: 'test.bleu.de',
        appName: 'testApp',
        serverName: 'testServer'
    });
    it('should send a valid log', function () {
        myLoggly.log('success', 'It works!');
    });
    it('should send a data', function () {
        myLoggly.logData({ testData: 'What a Dream!', nice: true });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUI7QUFFckIsOENBQTZDO0FBRTdDOztHQUVHO0FBQ0gsK0JBQTJCO0FBQzNCLElBQUksUUFBUSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUE7QUFFakUsUUFBUSxDQUFDLGNBQWMsRUFBRTtJQUN2QixJQUFJLFFBQVEsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDckMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTtRQUMvQixVQUFVLEVBQUUsY0FBYztRQUMxQixPQUFPLEVBQUUsU0FBUztRQUNsQixVQUFVLEVBQUUsWUFBWTtLQUN6QixDQUFDLENBQUE7SUFDRixFQUFFLENBQUMseUJBQXlCLEVBQUU7UUFDNUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdEMsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDdkIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9