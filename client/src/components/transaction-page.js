import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login'
import {getTransactionList} from '../actions/transaction'


class Transaction extends React.Component{
    componentDidMount() {
        // let id = this.props.user.id;
        this.props.dispatch(getTransactionList())
        
        
      }
render(){
    return(
    <div className="transaction_wrapper">
    <h1>Your Transactions</h1>
    <div className="transaction">
        
      <div className="TransactionDisplay">
        <h3>
          {/* Total Portfolio Value: ${Number(totalPortfolioValue).toFixed(2)} */}
        </h3>
           <li>balance</li>
           <li>Stock</li>
           <li>Shares</li>
      </div>
         </div>
  </div>);
}
}
const mapStateToProps = state => {
    return {
    currentUser: state.auth.currentUser

    //   user: state.auth.currentUser,
    //   balance: state.portfolio.balance,
    //   positions: state.positions,
    };
  };
  
  export default requiresLogin()(connect(mapStateToProps)(Transaction));
  