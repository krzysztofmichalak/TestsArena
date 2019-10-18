const { AfterAll } = require('cucumber');
const driver = require('../../utils/webDriver');

/**
 * Tear-down
 */
AfterAll(async () => {
  if (driver != null) {
    driver.quit();
  }
});
