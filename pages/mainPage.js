const { By, until } = require('selenium-webdriver');
const driver = require('../utils/webDriver');

const mainPage = () => {
  const elements = {
    searchInput: By.id("search-typeahead"),
    searchButton: By.className("search-submit"),
  };
  return {
    async searchItem(item) {
      const searchElement = driver.findElement(elements.searchInput)
      await driver.wait(until.elementIsVisible(searchElement));
      await searchElement.sendKeys(item);
      await driver.findElement(elements.searchButton).click();
    }
  }
};

module.exports = { mainPage };