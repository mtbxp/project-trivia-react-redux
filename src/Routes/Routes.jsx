import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../page/Game';
import Login from '../page/Login';
import Ranking from '../page/Ranking';
import Settings from '../page/Settings';
import Feedback from '../page/Feedback';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}
