import React, {Component} from 'react'
import styles from './MainPage.module.css'
import Pie from "./Pie/Pie";
import TotalTable from "./TotalTable/TotalTable";
import partyGuestsRequest from "./APIrequests/partyGuestsRequest";
import getEncodedNames from "./functions/getEncodedNames";
import partyGuestsDietsRequest from "./APIrequests/partyGuestsDietsRequest";
import getPartOfVeganGuests from "./functions/getPartOfVeganGuests";
import getRandomVeganPizza from "./functions/getRandomVeganPizza";
import getPizzaEaters from "./functions/getPizzaEaters";
import currencyExchangeRequest from "./APIrequests/currencyExchangeRequest";
import veganPizzaRequest from "./APIrequests/veganPizzaRequest";
import meatPizzaRequest from "./APIrequests/meatPizzaRequest";
import drinksRequest from "./APIrequests/drinksRequest";
import converter from "./functions/converter";
import wholePriceRounder from "./functions/wholePriceRounder";
import getNotPizzaEaters from "./functions/getNotPizzaEaters";

class MainPage extends Component {
  state = {
    party: [],
    isLoading: false,
    pizzaData: [],
    guestsDiet: [],
    finalPizzaPrice: null,
    finalDrinksPrice: null,
    pizzaEaters: [],
    notPizzaEaters: [],
    drinksData: [],
    pizzaCostPerGuestRounded: null,
    drinkCostPerGuestRounded: null,
    costForPizzaAndDrinkPerGuest: null,
    totalOrder: null,
    error: null
  };

  fetchUsers = async () => {
    this.setState({isLoading: true});
    try {
      const party = await partyGuestsRequest();
      this.setState({party});

      const encodedGuestsNames = getEncodedNames(party);

      const guestsDiet = await partyGuestsDietsRequest(encodedGuestsNames);
      this.setState({guestsDiet});

      const partOfVegans = getPartOfVeganGuests(guestsDiet);

      const randomVeganPizza = getRandomVeganPizza();

      const pizzaEaters = getPizzaEaters(party);
      const notPizzaEaters = getNotPizzaEaters(party);
      this.setState({pizzaEaters, notPizzaEaters});

      if (partOfVegans > 51) {
        const pizzaPriceFormatted = await veganPizzaRequest(randomVeganPizza, pizzaEaters);
        this.setState({pizzaData: pizzaPriceFormatted});
      } else {
        const pizzaPriceFormatted = await meatPizzaRequest(pizzaEaters);
        this.setState({pizzaData: pizzaPriceFormatted});
      }

      const drinksPriceFormatted = await drinksRequest(party);

      const currencyInfo = await currencyExchangeRequest();

      const convertedPizzaPrice = converter(this.state.pizzaData, currencyInfo);
      const convertedDrinksPrice = converter(drinksPriceFormatted, currencyInfo);


      const finalPizzaPriceRounded = wholePriceRounder(convertedPizzaPrice);
      console.log('pizza price ' + finalPizzaPriceRounded);
      const finalDrinksPriceRounded = wholePriceRounder(convertedDrinksPrice);
      console.log('drinks price ' + finalDrinksPriceRounded);
      this.setState({finalDrinksPrice: finalDrinksPriceRounded, finalPizzaPrice: finalPizzaPriceRounded});

      const totalOrder = (finalPizzaPriceRounded + finalDrinksPriceRounded).toFixed(1);
      this.setState({totalOrder});
      console.log('total order ' + totalOrder);

      const drinkCostPerGuestRounded = +(this.state.finalDrinksPrice / this.state.party.length).toFixed(2);
      console.log('guests count' + this.state.party.length);
      console.log('for drink per guest ' + drinkCostPerGuestRounded);
      const pizzaCostPerGuestRounded = +(this.state.finalPizzaPrice/this.state.pizzaEaters.length).toFixed(2);
      console.log('for pizza per guest ' + pizzaCostPerGuestRounded);
      this.setState({pizzaCostPerGuestRounded, drinkCostPerGuestRounded});
      const costForPizzaAndDrinkPerGuest = +(this.state.drinkCostPerGuestRounded + this.state.pizzaCostPerGuestRounded).toFixed(2);
      console.log('for pizza and drink per guest ' + costForPizzaAndDrinkPerGuest);
      this.setState({costForPizzaAndDrinkPerGuest});


    } finally {
      this.setState({
        isLoading: false,
      })
    }
  };

  render() {
    const {isLoading, error, pizzaData, pizzaEaters} = this.state;

    return (
      <div className={styles.wrapper}>
        <button className={isLoading === false ? styles.button : styles.button_loading} onClick={this.fetchUsers} disabled={isLoading}>
          Load Party
        </button>
        {isLoading ? <h4>Waiting...</h4> : (
          <div className={styles.content_field}>
            {error ? <p>Something goes wrong!:(</p> : null}
            {pizzaEaters.length > 0 && <React.Fragment>
              <div className={styles.pizza_description}>
              <Pie counter={pizzaEaters.length}/>
              <div>The number of people who eats pizza is <strong>{pizzaEaters.length}</strong></div>
              <div>
                Ordered pizza: <strong>{pizzaData.name} </strong>
                Type: <strong>{pizzaData.type} </strong>
                Price: <strong>{pizzaData.price} </strong>
              </div>
              </div>
              <TotalTable state={this.state} />
            </React.Fragment>}
          </div>
        )}
      </div>
    )
  }

}

export default MainPage;