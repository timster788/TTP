import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchStockData} from '../actions/stock'
// import { createBuyStocks } from '../store';

class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.props.dispatch(fetchStockData(this.props.symbol));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const symbol = this.state.symbol;
    const quantity = this.state.quantity;
    event.preventDefault();
    this.props.createBuyStocks(symbol, quantity);
    this.setState({ symbol: '', quantity: 0 });
    console.log(symbol)
  }

  render() {
    //   if(!this.props.symbol){
    //     return (
    //         <section className="loading-page">
    //           <p>Loading...</p>
    //         </section>
    //       );
    //   }
    const {  buyError } = this.props;

    return (
      <div className="buyForm">
        <h3>Balance: 50000</h3>
        <form onSubmit={this.handleSubmit} className="formBody">
          <div className="formItem">
            <label className="font">symbol</label>
            <input
              type="text"
              name="symbol"
              value={this.state.symbol}
             
              
              onChange={this.handleChange}
            />
            
          </div>
          <div className="formItem">
            <label className="font">Qty</label>
            <input
              type="number"
              name="quantity"
              placeholder=""
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
          <button className="formItem" type="submit">
            BUY
          </button>
          {buyError ? <p className="ERROR font">{buyError}</p> : null}
        </form>
      </div>
    );
  

  }
}


const mapStateToProps = (state, props) => {
    
    return {
      symbol: state.stock.symbol
      
    };
  };

export default connect(
  mapStateToProps,
  
)(BuyForm);
