import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Questions from './Questions/Questions';
import Question from './Question/Question';
import Callback from './Callback';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import './index.css';
import NewQuestion from './NewQuestion/NewQuestion';
import auth0Client from './Auth';

class App extends Component {
  async componentDidMount() {
    const { location: { pathname } } = this.props;
    if (pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Questions} />
          <Route exact path="/question/:questionId" component={Question} />
          <Route exact path="/callback" component={Callback} />
          <SecuredRoute path="/new-question" component={NewQuestion} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
