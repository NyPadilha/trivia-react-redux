import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  hanleClick3 = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  hanleClick2 = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const MAGIC_NUMBER = 3;
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        { assertions < MAGIC_NUMBER ? (
          <h3 data-testid="feedback-text">Could be better...</h3>)
          : <h3 data-testid="feedback-text">Well Done!</h3>}
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.hanleClick2 }
        >
          Jogar novamente

        </button>

        <button
          type="button"
          onClick={ this.hanleClick3 }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { score, assertions } }) => ({
  score,
  assertions,
});

Feedback.propTypes = PropTypes.shape({}).isRequired;

export default connect(mapStateToProps)(Feedback);
