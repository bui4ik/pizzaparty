import React, {Component} from 'react'

class Button extends Component {
  state = {
    isButtonDisabled: false,
    buttonValue: 'PAY',
  };

  onClick = () => {
    this.setState({isButtonDisabled:true, buttonValue: 'PAID'});
    this.props.onClick();
  };

  render() {
    return <button onClick={this.onClick} disabled={this.state.isButtonDisabled}>{this.state.buttonValue}</button>
  }
}

export default Button;