const valueSeparator = 'z';
const priceSeparator = ' ';

function getGrosze(ValueInZloty) {
  ValueInZloty = ValueInZloty.substring(0, ValueInZloty.indexOf(priceSeparator));
  return parseFloat(ValueInZloty) * 100;
}

function getCountValue(valueData) {
  const countBegining = valueData.indexOf(valueSeparator) + 2;

  return parseFloat(valueData.substring(countBegining));
}

module.exports = {
  getGrosze,
  getCountValue,
};