import React, {Component} from 'react'
import styles from '../MainPage.module.css'
import Button from "./button";

class TotalTable extends Component {
  state = {
    totalOrder: this.props.state.totalOrder,
    moneyToCollect: this.props.state.totalOrder,
    moneyCollected: 0,
    isButtonDisabled: false
  };

  onClick = () => {

    const collectedMoney = +(this.state.moneyCollected + this.props.state.costForPizzaAndDrinkPerGuest).toFixed(2);
    const moneyToCollect = +(this.state.totalOrder - this.state.moneyCollected).toFixed(2);

    this.setState({moneyToCollect: moneyToCollect, moneyCollected: collectedMoney, isButtonDisabled: true});
  };

  onClickDrink = () => {

    const collectedMoney = +(this.state.moneyCollected + this.props.state.drinkCostPerGuestRounded).toFixed(2);
    const moneyToCollect = +(this.state.totalOrder - this.state.moneyCollected).toFixed(2);

    this.setState({moneyToCollect: moneyToCollect, moneyCollected: collectedMoney, isButtonDisabled: true});
  };

  render() {
    const {moneyToCollect, moneyCollected} = this.state;

    return (
      <React.Fragment>
        <div className={styles.tableTemplate}>
          <div className={styles.item_head}>Name</div>
          <div className={styles.item_head}>Share to Pay</div>
          <div className={styles.item_head}>Payment Status</div>

          {this.props.state.guestsDiet.map(guests =>
            <React.Fragment key={guests.name}>
              {guests.isVegan
                ? <div className={styles.veganItem}>{guests.name} eats</div>
                : <div className={styles.item}>{guests.name} eats</div>
              }
              <div className={styles.item}>{this.props.state.costForPizzaAndDrinkPerGuest} BYN</div>
              <div className={styles.item}>
                <Button onClick={this.onClick}/>
              </div>
            </React.Fragment>
          )}

          {this.props.state.party.map(guests =>
            <React.Fragment key={guests.name}>{!guests.eatsPizza ?
              <div className={styles.veganItem}>{guests.name} drinks</div>
              :
              <div className={styles.item}>{guests.name} drinks</div>}
              <div className={styles.item}>{this.props.state.drinkCostPerGuestRounded} BYN</div>
              <div className={styles.item}>
                <Button onClick={this.onClickDrink}/>
              </div>
            </React.Fragment>
          )}

          <div className={styles.item}>Total order</div>
          <div className={styles.item}>{this.props.state.totalOrder} BYN</div>
          <div className={styles.item}/>
          <div className={styles.item}>Money to collect</div>
          <div className={styles.item}>{moneyToCollect} BYN</div>
          <div className={styles.item}/>
          <div className={styles.item}>Money collected</div>
          <div className={styles.item}>{moneyCollected} BYN</div>
          <div className={styles.item}/>

        </div>

      </React.Fragment>
    )
  }
}

export default TotalTable;