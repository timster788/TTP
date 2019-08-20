import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import HeaderBar from './header-bar';
import { Link } from 'react-router-dom';


export class Dashboard extends React.Component {
  componentDidMount() {
    
  }

  render() {
    console.log('dashboard this.props: ', this.props);
    
    ;

    return (
      <div>
        <HeaderBar />
        <Link to="/portfolio">
          <button className="landing button">portfolio</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    username: state.auth.currentUser.username,
    
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
