import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';


export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    return (
      <div className="header">
        <h2>Welcome, {this.props.username}</h2>
        <button className="logout" onClick={() => this.logOut()}>Log out</button>
        <nav>
        <div className="header-links">
          <Link to='/portfolio'>Portfolio</Link>
          <Link to='/transactions'>Transaction</Link>
          <button className="logout" onClick={() => this.logOut()}>Log out</button>
          </div>
        </nav>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username
  };
};

export default connect(mapStateToProps)(HeaderBar);