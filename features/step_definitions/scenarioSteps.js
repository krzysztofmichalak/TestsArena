const { When, Then } = require('cucumber');
const { mainPage } = require('../../pages/mainPage');
const { searchResultPage } = require('../../pages/searchResultPage');
const assert = require('assert');
const { getGrosze, getCountValue } = require('../../utils/dataConverter');
const {cheapest, mostExpensive, priceStorage} = require('../../utils/prices')

When(
    'a user search item called {string} on the auction platform',
    async function (item) {
        await mainPage().searchItem(item);
    });

When(
    'save {string} item price',
    async function (priceTitle) {
        const priceData = await searchResultPage().getPriceFromItem(0);
        priceStorage[priceTitle] = getGrosze(priceData);
    }
);

When(
    'a user sorts searched items by {string}', async function (sortingRule) {
        await searchResultPage().sortItemsBy(sortingRule);
    });

When(
    'display sum of prices of {int} elements if price first of its is less than {string}',
    async function (itemCount, maxPrice) {
        let sum = 0;
        if (priceStorage[cheapest] < getGrosze(maxPrice)) {
            for (let itemNumber = 0; itemNumber < itemCount; itemNumber++) {
                const priceData = await searchResultPage().getPriceFromItem(itemNumber);
                sum += getGrosze(priceData);
            }
            sum  /= 100;
            console.info('\n# Sum prices of ' + itemCount.toString() + ' items [PLN]: ', sum);
        }
    });

When(
    'display difference between cheapest and most expensive if price of first item is greater than {string}',
    async function (minPrice) {
        if (priceStorage[cheapest] > getGrosze(minPrice)) {
            await searchResultPage().sortItemsBy('Cena malejąco');
            const priceData = await searchResultPage().getPriceFromItem(0);
            priceStorage[mostExpensive] = getGrosze(priceData);
            console.info(
                '\n# Prices and difference [PLN]: ',
                {
                    Cheapest: priceStorage[cheapest] / 100,
                    MostExpensive: priceStorage[mostExpensive] / 100,
                    Difference: (priceStorage[mostExpensive] - priceStorage[cheapest]) / 100
                }
            )
        }
    }
);

Then(
    'price of {int} founded item should be grater than count of all items',
    async function (itemNumber) {
        itemNumber -= 1;
        const priceData = await searchResultPage().getPriceFromItem(itemNumber);
        const countData = await searchResultPage().getItemsCountData();
        const grosze = getGrosze(priceData);
        const itemsCount = getCountValue(countData);
        console.info(
            '\n# Data to compare: ',
            {'Item price in grosze': grosze, 'Items count': itemsCount }
        );
        assert(
            grosze > itemsCount,
            'Price of first item is not grater than searched items count. ' +
            'Price in grosze: ' + grosze.toString() +
            ', Items count: ' + itemsCount.toString()
        );
    });

Then(
    'price of first item should be less than {string} or greater than {string}',
    async function (lessThan, greaterThan) {
        assert(
            priceStorage[cheapest] < getGrosze(lessThan) || priceStorage[cheapest] > getGrosze(greaterThan),
            'Price is between ' + lessThan + ' and ' + greaterThan
        );
    }
);

Then(
    'a user should see {int} items count',
    async function (expectedItemsCount) {
        const countData = await searchResultPage().getItemsCountData();
        const currentItemsCount = getCountValue(countData);
        assert(
            expectedItemsCount === currentItemsCount,
            'Items count is not as expected. ' +
            'Expected: ' + expectedItemsCount.toString() +
            ', Current: ' + currentItemsCount.toString()
        );
    }
);

Then(
    'the user should see {int} items on first page',
    async function (expectedDisplayedItems) {
        const currentDisplayedItems = await searchResultPage().getDisplayedItemsCount();
        assert(
            expectedDisplayedItems === currentDisplayedItems,
            'Items count is not as expected. ' +
            'Expected: ' + expectedDisplayedItems.toString() +
            ', Current: ' + currentDisplayedItems.toString()
        );
    }
);



