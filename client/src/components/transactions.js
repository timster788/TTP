
import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import requiresLogin from './requires-login';

import { connect } from 'react-redux';
import { fetchTradesByUserId } from '../actions/trade';
import HeaderBar from './header-bar'

class Transaction extends React.Component {
  componentDidMount() {
    this.props.fetchTradesByUserId(this.props.userId);
  }

  render() {
    const { trades } = this.props;
    return (<div><HeaderBar /><div className="main"> <h2>Transaction</h2>
      {trades.map(trade => (<div key={trade.data._id}>
          <List>
            <ListItem>
              <ListItemText>{trade.tradeType}({trade.symbol})</ListItemText>
              <ListItemText>... {trade.shares} shares @ ${trade.price}</ListItemText>
            </ListItem>
          </List>
          <Divider />
        </div>)
      )}
    </div>
    </div>);
  }
}

const mapStateToProps = (state) => ({
    user: state.auth.currentUser,
  userId: state.auth.currentUser,
  trades: state.trades.tradesByUserId
});

const mapDispatchToProps = dispatch => {
  return {
    fetchTradesByUserId: (userId) => dispatch(fetchTradesByUserId(userId))
  };
};

export default requiresLogin()
 connect(mapStateToProps, mapDispatchToProps)(Transaction);
