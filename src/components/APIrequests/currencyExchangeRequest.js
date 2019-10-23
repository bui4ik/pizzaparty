import {CURRENCY_API} from "../../api/api";

const currencyExchangeRequest = async () => {
  const currencyResponse = await fetch(CURRENCY_API);
  return await currencyResponse.json();
};

export default currencyExchangeRequest;