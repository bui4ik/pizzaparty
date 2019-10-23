const guestPriceRounder = (price, guests) => {
  return +(price / guests.length).toFixed(2);
};

export default guestPriceRounder;