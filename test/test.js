"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUVyQiw4Q0FBNkM7QUFFN0M7O0dBRUc7QUFDSCwrQkFBMkI7QUFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxXQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQTtBQUVqRSxRQUFRLENBQUMsY0FBYyxFQUFFO0lBQ3JCLElBQUksUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZO1FBQy9CLFVBQVUsRUFBRSxjQUFjO1FBQzFCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFVBQVUsRUFBRSxZQUFZO0tBQzNCLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtRQUMxQixRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN4QyxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtRQUNyQixRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtJQUM3RCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIn0=