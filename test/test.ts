import 'typings-test'
import { expect } from 'smartchai'
import * as beautyremote from '../dist/index'

/**
 * set up env vars
 */
import { Qenv } from 'qenv'
let testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit')

describe('beautyremote', function () {
    let myLoggly = new beautyremote.Loggly({
        token: process.env.LOGGLY_TOKEN,
        domainName: 'test.bleu.de',
        appName: 'testApp',
        serverName: 'testServer'
    })
    it('should send a valid log', function () {
        myLoggly.log('success', 'It works!')
    })
    it('should send a data', function () {
        myLoggly.logData({testData: 'What a Dream!', nice: true})
    })
})
