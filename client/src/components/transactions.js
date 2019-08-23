import React from 'react'
import TransactionsWrapper from './transaction-wrapper'
import { connect } from 'react-redux';
import requiresLogin from './requires-login'


export default class Transactions extends React.Component{
    render(){
        return(
            <div className = "transactions"><TransactionsWrapper></TransactionsWrapper></div>
        )
           
        
    }
}