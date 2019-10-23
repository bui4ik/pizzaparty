const convertDrinksPriceToBYN = (drinksPriceWithoutCurrency, { USD, EUR }) => {
  switch (drinksPriceWithoutCurrency[1]) {
    case 'BYN':
      return  drinksPriceWithoutCurrency[0];
    case 'USD':
      return drinksPriceWithoutCurrency[0] / USD;
    case 'EUR':
      return drinksPriceWithoutCurrency[0] / EUR;
    default:
      break;
  }
};

export default convertDrinksPriceToBYN;