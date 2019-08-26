// import React from 'react';

// import './index.css';
// import LandingPage from './components/landing-page';
// import LoginPage from './components/login-page';
// import RegistrationPage from './components/registration-page';
// import Portfolio from './components/portfolio';
// import Transaction from './components/transactions';

// import { connect } from 'react-redux';
// import { Route, Switch, withRouter } from 'react-router-dom';

// import Dashboard from './components/dashboard';
// import { refreshAuthToken } from '../src/actions/auth';

// export class App extends React.Component {
//   componentDidUpdate(prevProps) {
//     if (!prevProps.loggedIn && this.props.loggedIn) {
//       // When we are logged in, refresh the auth token periodically
//       this.startPeriodicRefresh();
//     } else if (prevProps.loggedIn && !this.props.loggedIn) {
//       // Stop refreshing when we log out
//       this.stopPeriodicRefresh();
//     }
//   }

//   componentWillUnmount() {
//     this.stopPeriodicRefresh();
//   }

//   startPeriodicRefresh() {
//     this.refreshInterval = setInterval(
//       () => this.props.dispatch(refreshAuthToken()),
//       60 * 60 * 1000 // One hour
//     );
//   }

//   stopPeriodicRefresh() {
//     if (!this.refreshInterval) {
//       return;
//     }

//     clearInterval(this.refreshInterval);
//   }

//   render() {
//     return (
//       <div className="app">
//         <Route exact path="/" component={LandingPage} />
//         <Route exact path="/login" component={LoginPage} />
//         <Route exact path="/dashboard" component={Dashboard} />
//         <Route exact path="/register" component={RegistrationPage} />
        
//         <Route exact path="/portfolio" component={Portfolio} />
//         <Route  exact path="/transaction" component={Transaction} />
      
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   hasAuthToken: state.auth.authToken !== null,
//   loggedIn: state.auth.currentUser !== null
// });

// // Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking

// export default withRouter(connect(mapStateToProps)(App));
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Login, Signup } from './components/auth-form';
import Portfolio from './components/portfolio';
import Transaction from './components/transaction';
import { me } from './store/user';

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/transaction" component={Transaction} />
          </Switch >
        )}
        <Route component={Login} />
      </Switch >
    );
  }
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
});


App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};


export default withRouter((connect(mapState, mapDispatch))(App));
