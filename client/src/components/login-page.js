// import React from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// import LoginForm from './login-form';

// export function LoginPage(props) {
//   // If we are logged in redirect straight to the user's dashboard
//   if (props.loggedIn) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div className="Login">
//       <h2>Welcome to MangAnime</h2>
//       <LoginForm />
//     </div>
//   );
// }

// const mapStateToProps = state => ({
//   loggedIn: state.auth.currentUser !== null
// });

// export default connect(mapStateToProps)(LoginPage);

import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import styles from './styles/forms.module.css';


export function LoginPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="loginPage">
      <div className="logoBlock">
        <Link to="/" className={styles.logoLink}>
          
        </Link>
        <h2 className={styles.header}>Login</h2>
      </div>
      <LoginForm />
      <Link to="/register" className={styles.linkToOtherForm}>
        Register
      </Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);