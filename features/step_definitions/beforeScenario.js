const { Before } = require('cucumber');
const driver = require('../../utils/webDriver');

/**
 * Tear-down
 */
Before(async () => {
    await driver.get("https://arena.pl");
});
