import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../page/Game';
import Login from '../page/Login';
import Settings from '../page/Settings';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}
