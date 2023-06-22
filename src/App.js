import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
// import Game from './pages/Game';
import PageConfig from './pages/PageConfig';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/gameScreen" component={ Game } /> */}
        <Route path="/settings" component={ PageConfig } />
      </Switch>
    </div>
  );
}
