const wholePriceRounder = (price) => {
  return  Math.round(price * 10) / 10;
};

export default wholePriceRounder;