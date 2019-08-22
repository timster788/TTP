import React from 'react'
import { Link } from 'react-router-dom';
// import BuyForm from './buy-form'
import AddTransactionWrapper from './add-transaction-wrapper';
import PositionCard from './position-card'
import { connect } from 'react-redux';
import requiresLogin from './requires-login'
import  {getPortfolio}  from '../actions/portfolio'
import buyForm from './buy-form';
 class Portfolio extends React.Component {

    componentDidMount() {
        // let id = this.props.user.id;
        
        
        
      }

      
    
      render() {
        // const { positions, balance } = this.props;
        // let totalPortfolioValue = 0;
        // positions.map(position => (totalPortfolioValue += position.totalStockVal));
       
        return (
          <div className="portfolio_wrapper">
            <h1>Your Portfolio</h1>
            <div className="portfolio">
                
              <div className="portfolioDisplay">
                <h3>
                  {/* Total Portfolio Value: ${Number(totalPortfolioValue).toFixed(2)} */}
                </h3>
                   <li>balance</li>
                   <li>Stock</li>
                   <li>Shares</li>
              </div>
<AddTransactionWrapper></AddTransactionWrapper>            </div>
          </div>
        );
      }

}

const mapStateToProps = state => {
    return {
      
      user: state.auth.currentUser,
    //   balance: state.portfolio.balance,
    //   positions: state.positions,
    };
  };
  
  export default requiresLogin()(connect(mapStateToProps)(Portfolio));
  