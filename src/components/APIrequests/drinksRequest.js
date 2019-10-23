import {DRINKS_API} from "../../api/api";

const drinksRequest = async (party) => {
  const drinksResponse = await fetch(`${DRINKS_API}${party.length}`);
  const {price} = await drinksResponse.json();
  return  price.split(' ');
};

export default drinksRequest;