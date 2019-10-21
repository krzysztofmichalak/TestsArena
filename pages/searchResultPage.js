const driver = require('../utils/webDriver');
const {WebElementCondition} = require("selenium-webdriver");
const { By, until } = require('selenium-webdriver');

const searchResultPage = () => {
  const elements = {
    itemsCount: By.className("listing-pagination__change-page"),
    searchedItems: By.className("product product--grid"),
    price: By.className("product__price"),
    sortingRule: By.xpath("//*[@class='navigation-bar__sort']//*[@class='selected-tag']"),
    sortingRuleOnList: By.xpath("//*[@class='dropdown-menu']/li/a"),
    itemsLoader: By.className("products-listing__loading-overflow")
  };
  
  async function rollDownSortingRules() {
    const currentSortingRule = await driver.findElement(elements.sortingRule);
    await driver.wait(until.elementIsVisible(currentSortingRule));
    await currentSortingRule.click();
    await driver.wait(until.elementsLocated(elements.sortingRuleOnList));
  }

  async function selectSortingRule(newSortingRule) {
    const sortingRulesOnList = await driver.findElements(elements.sortingRuleOnList);
    for (let sortingRuleOnList of sortingRulesOnList) {
      await driver.wait(until.elementIsVisible(sortingRuleOnList));
      const sortingRuleText = await sortingRuleOnList.getText();
      if (sortingRuleText === newSortingRule) {
        await sortingRuleOnList.click();
        await waitForLoadingItems();

        return;
      }
    }
  }

  async function waitForLoadingItems() {
      await driver.findElement(elements.itemsLoader).then(
          async function (loader) {
            await driver.wait(until.stalenessOf(loader), 10000);
          },
          function (err) {
            console.warn('During loading items something went wrong');
          }
      );
  }

  return {
    async getItemsCountData() {
      const itemsCountElement = await driver.findElement(elements.itemsCount);
      await driver.wait(until.elementIsVisible(itemsCountElement));
      return await itemsCountElement.getText();
    },

    async getPriceFromItem(itemNumber) {
      await driver.wait(until.elementsLocated(elements.searchedItems));
      const displayedItems = await driver.findElements(elements.searchedItems);

      return await displayedItems[itemNumber].findElement(elements.price).getText();
    },

    async sortItemsBy(newSortingRule) {
      const currentSortingRule = await driver.findElement(elements.sortingRule).getText();
      if (newSortingRule === currentSortingRule) {
        return;
      }
      await rollDownSortingRules();
      await selectSortingRule(newSortingRule);
    },

    async getDisplayedItemsCount() {
      const displayedItems = await driver.findElements(elements.searchedItems);

      return displayedItems.length;
    }
  }
};

module.exports = { searchResultPage };