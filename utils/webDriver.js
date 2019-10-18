require('chromedriver');
const { Builder } = require('selenium-webdriver');
const { setDefaultTimeout } = require('cucumber');
const TIMEOUT = 20000;

const driver = new Builder().forBrowser('chrome').build();
driver.manage().setTimeouts({
    implicit: TIMEOUT,
    pageLoad: TIMEOUT,
    script: TIMEOUT
});
setDefaultTimeout(TIMEOUT);

module.exports = driver;