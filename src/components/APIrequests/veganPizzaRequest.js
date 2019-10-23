import {PIZZA_ORDER_API} from "../../api/api";

const veganPizzaRequest = async (randomVeganPizza,pizzaEaters) => {
  const pizzaResponse = await fetch(`${PIZZA_ORDER_API}${randomVeganPizza}/${pizzaEaters.length}`);
  const {price} = await pizzaResponse.json();
  return price.split(' ');
};

export default veganPizzaRequest;