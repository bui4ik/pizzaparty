const getNotPizzaEaters = (party) => {
  return  party.filter(({ eatsPizza }) => !eatsPizza);
};

export default getNotPizzaEaters;