import { TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { buy, fetchAllValidSymbols } from '../actions/trade';
 import requiresLogin from './requires-login';

class Trade extends React.Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
      qty: '',
      symbolErr: '',
      qtyErr: ''
    };
    this.symbolHandleChange = this.symbolHandleChange.bind(this);
    this.qtyHandleChange = this.qtyHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllValidSymbols();
  }

  symbolHandleChange(event) {
    this.setState({
      symbol: event.target.value,
      symbolErr: ''
    });
  }

  qtyHandleChange(event) {
    const intRex = /^\d+$/;
    if (event.target.value === '') {
      this.setState({ qtyErr: '', qty: '' });
      return;
    }
    if (intRex.test(event.target.value)) {
      this.setState({ qtyErr: '', qty: event.target.value });
    } else {
      this.setState({
        qtyErr: 'Only positive integer of shares allowed!',
        qty: this.state.qty
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const symbol = this.state.symbol;
    console.log(this.state.symbol,'STATE')
    const { validSymbolSet } = this.props;
    console.log(symbol,'symbol')
    if (!validSymbolSet.has(symbol)) {
      this.setState({
        symbolErr: 'Ticker Symbol Not Valid!',
        symbol: this.state.symbol
      });
      console.log(symbol,'symbol2')

      return;
    }
    const shares = Number(this.state.qty);
    if (shares <= 0) {
      this.setState({
        qtyErr: 'Only positive integer of shares allowed!'
      });
      return;
    }
    
    this.props.buy(this.props,symbol,shares);
    console.log(this.props.buy,'Buy')
  }

  render() {
    const { cashBal, error } = this.props;
    console.log(this.props,'Props')
    console.log('ERR', error);
    return (
      <div className="trade-view">
        <h3>Cash Available: $ {cashBal.toFixed(2)}</h3>
        <form onSubmit={this.handleSubmit} className="trade-form">
          <TextField
            id="outlined-name"
            label="Symbol"
            name="symbol"
            value={this.state.symbol}
            onChange={this.symbolHandleChange}
            margin="normal"
            variant="outlined"
            error={!!this.state.symbolErr.length}
            helperText={this.state.symbolErr}
            placeholder="type a valid ticker"
          />
          <TextField
            id="outlined-number"
            label="Qty"
            name="qty"
            value={this.state.qty}
            onChange={this.qtyHandleChange}
            type="number"
            margin="normal"
            variant="outlined"
            error={!!this.state.qtyErr.length}
            helperText={this.state.qtyErr}
            placeholder="positive integer of shares"
          />
          <button type="submit" className="submit-button">Buy</button>
        </form>
        {error && error.response && <div className="err-message"> {error.response.data} </div>}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  // userId: state.user.id,
  cashBal: state.auth.currentUser.cashBal,
  error: state.trades.error,
  validSymbolSet: state.trades.validSymbolSet
});

const mapDispatch = dispatch => {
  return {
    fetchAllValidSymbols: () => dispatch(fetchAllValidSymbols()),
    buy: ( symbol, shares) => dispatch(buy( symbol, shares))
  };
};



export default 
connect(mapStateToProps,mapDispatch)(Trade);