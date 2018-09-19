import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import auth0Client from '../Auth';

const SecuredRoute = (props) => {
  const { component: Component, path } = props;
  return (
    <Route
      path={path}
      render={() => {
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div />;
        }
        return <Component />;
      }}
    />
  );
};

// SecuredRoute.propTypes = {
//   //component: PropTypes.instanceOf(React.Component).isRequired,
//   path: PropTypes.string.isRequired,
// };

export default SecuredRoute;
