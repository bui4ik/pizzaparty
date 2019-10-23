import {PIZZA_ORDER_API} from "../../api/api";

const meatPizzaRequest = async (pizzaEaters) => {
  const pizzaResponse = await fetch(`${PIZZA_ORDER_API}meat/${pizzaEaters.length}`);
  const {price} = await pizzaResponse.json();
  return price.split(' ');
};

export default meatPizzaRequest;