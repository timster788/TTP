import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Trade from './trade-form';
import HeaderBar from './header-bar'
import Holding from './holding'
class Portfolio extends React.Component {

  render() {
    return (<div><HeaderBar></HeaderBar><Holding></Holding> Portfolio
    <Trade></Trade>
      <div className="main portfolio-main"></div>
    </div>);
  }
  }


const mapStateToProps = state => {
  return {
    user: state.auth.currentUser,
    userId:state.auth.currentUser._id
  };
};

export default requiresLogin()(connect(mapStateToProps)(Portfolio));






