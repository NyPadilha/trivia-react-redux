import React, { Component } from 'react';
import Header from '../components/Header';
import GameQuestions from '../components/GameQuestions';

export default class Game extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <GameQuestions />
        </main>
      </div>
    );
  }
}
