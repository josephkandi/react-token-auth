import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import auth0Client from './Auth';


const NavBar = ({ history }) => {
  const signOut = () => {
    auth0Client.signOut();
    history.replace('/');
  };
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Q&App
      </Link>
      {
        !auth0Client.isAuthenticated()
        && <button type="button" className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated()
        && (
        <div>
          <img className="mr-2 rounded" src={auth0Client.getProfile().picture} alt="Profile" widht="28" height="28" />
          <span className="mr-2 text-white">{auth0Client.getProfile().name}</span>
          <button type="button" className="btn btn-dark" onClick={() => { signOut(); }}>Sign Out</button>
        </div>
        )
      }
    </nav>
  );
};

NavBar.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(NavBar);
