const getRandomVeganPizza = () => {
  const veganPizzas = ['vegan', 'cheese'];
  const randomVeganPizza = Math.floor(Math.random() * veganPizzas.length);

  return veganPizzas[randomVeganPizza];
};

export default getRandomVeganPizza;