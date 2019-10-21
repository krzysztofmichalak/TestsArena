const { Before } = require('cucumber');
const driver = require('../../utils/webDriver');
const uxga_resolution = {width: 1600, height: 1200};

/**
 * Tear-down
 */
Before(async () => {
    await driver.manage().window().setRect(uxga_resolution);
    await driver.get("https://arena.pl");
});
