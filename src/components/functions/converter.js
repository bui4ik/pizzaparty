const converter = (price, { USD, EUR }) => {
  switch (price[1]) {
    case 'BYN':
      return  price[0];
    case 'USD':
      return price[0] / USD;
    case 'EUR':
      return price[0] / EUR;
    default:
      break;
  }
};

export default converter;