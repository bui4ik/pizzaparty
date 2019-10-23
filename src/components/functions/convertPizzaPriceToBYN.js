const convertPizzaPriceToBYN = (pizzaPriceWithoutCurrency, { USD, EUR }) => {
  switch (pizzaPriceWithoutCurrency[1]) {
    case 'BYN':
      return  pizzaPriceWithoutCurrency[0];
    case 'USD':
      return pizzaPriceWithoutCurrency[0] / USD;
    case 'EUR':
      return pizzaPriceWithoutCurrency[0] / EUR;
    default:
      break;
  }
};

export default convertPizzaPriceToBYN;