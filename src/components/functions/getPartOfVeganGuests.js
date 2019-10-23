const getPartOfVeganGuests = diet => {
  const vegans = diet.filter(({isVegan}) => isVegan);

  return Math.round(vegans.length / diet.length * 100);
};

export default getPartOfVeganGuests;