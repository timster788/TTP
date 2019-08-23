import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { getTransactionList } from '../actions/transaction';
import { Header, Table } from 'semantic-ui-react';
import TransactionPage from './transaction-page';

export class TransactionWrapper extends React.Component {
  componentDidMount() {
    // let id = this.props.user.id;
    this.props.dispatch(getTransactionList());
  }

  render() {
    console.log(this.props, 'Shot in the Dark');
    const { error, loading, transactionList } = this.props;
    // if (error) {
    //   return <div>Error! {error.message}</div>;
    // }
    console.log(this.state);
    if (loading) {
      return <div>Loading...</div>;
    }

    const transactions = transactionList
      .map(
        transactionLists => (
          console.log(transactionList, 'transaction'),
          (
            <TransactionPage
              key={transactionLists._id}
              symbol={transactionLists.symbol}
              name={transactionLists.name}
              quantity={transactionLists.quantity}
              createdAt={transactionLists.createdAt}
            />
          )
        )
      )
      .reverse();

    return (
      <>
        <Header size="huge">Transactions</Header>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{transactions}</Table.Body>
        </Table>
      </>
    );
  }
}

const mapStateToProps = state => ({
  transactionList: state.transaction.results,
  loading: state.transaction.loading,
  error: state.transaction.error
});

export default requiresLogin()(connect(mapStateToProps)(TransactionWrapper));

//   return(
//     <div className="transaction_wrapper">
//     <h1>Your Transactions</h1>
//     <div className="transaction">

//       <div className="TransactionDisplay">
//         <h3>
//           {/* Total Portfolio Value: ${Number(totalPortfolioValue).toFixed(2)} */}
//         </h3>
//            <li>balance</li>
//            <li>Stock {this.props.symbol}</li>
//            <li>Shares{this.props.quantity}</li>
//       </div>
//          </div>
//   </div>);
// }
// }
