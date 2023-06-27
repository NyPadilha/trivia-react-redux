import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameQuestions from '../components/GameQuestions';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="game">
        <header>
          <Header />
        </header>
        <main>
          <GameQuestions
            history={ history }
          />
        </main>
      </div>
    );
  }
}

Game.propTypes = PropTypes.shape({}).isRequired;
