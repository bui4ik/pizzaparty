const getPizzaEaters = (party) => {
  return  party.filter(({ eatsPizza }) => eatsPizza);
};

export default getPizzaEaters;