import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchStockData } from '../actions/stock';
// import { createBuyStocks } from '../store';
import { addStockTransaction } from '../actions/transaction';
import { Field, reduxForm } from 'redux-form';

class BuyForm extends React.Component {
  componentDidMount() {
    // this.props.dispatch(fetchStockData());
  }

  handleSubmit = values => {
    console.log('values', values);
    const { symbol, quantity } = values;

    //    const userId = this.props.auth.currentUser

    const data = {
      //   userId:userId,
      symbol: symbol,
      quantity: quantity
    };
    console.log('why is this undefined', data);
    return this.props.dispatch(addStockTransaction(data));
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <label>Symbol</label>
          <div>
            <Field
              name="symbol"
              component="input"
              type="text"
              placeholder="Stock Symbol"
            />
          </div>
          <label>Quantity</label>
          <div>
            <Field
              name="quantity"
              component="input"
              type="number"
              placeholder="quantity"
            />
          </div>
        </div>
        <button
          name="submit"
          type="button"
          onClick={handleSubmit(this.handleSubmit)}
        />
        <div />
      </form>
    );
  }
}

export default reduxForm({ form: 'BuyForm' })(BuyForm);
