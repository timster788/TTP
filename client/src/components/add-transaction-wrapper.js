import React from 'react';
import AddTransaction from './add-transaction';
import { connect } from 'react-redux';
import requiresLogin from './requires-login'


export class AddTransactionWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      AddTransaction: false,
      complete: false
    };
  }
  handleClick = () => {
    this.setState({
      AddTransaction: !this.state.AddTransaction,
      complete: false
    });
  };
  completeTransaction = () => {
    console.log('complete');
    this.setState({
      complete: true,
      AddTransaction: false
    });
  };
  render() {
    return (
      <div>
        <AddTransaction
          symbol={this.props.symbol}
          quantity={this.props.quantity}
          
        //   userId={this.props.currentUser}
        />
      </div>
    );
  }
}

const mapStatetoProps = state => {
    
    
    
    return{
  symbol: state.symbol,
  quantity: state.quantity,
  
//    userId: state.auth.currentUser
}
 
};

export default requiresLogin()(connect(mapStatetoProps)(AddTransactionWrapper));