import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/MatrixTranslator';
import Game from './components/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/game/:sessionId" component={Game} />
      <Redirect to="/" />
    </Switch>
  );
}
