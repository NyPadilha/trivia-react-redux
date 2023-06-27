import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Feedback.css';

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
        <div className="feedback-contain">
          <div className="logo feedback">
            TRIVIA
          </div>
          <div className="feedback-result">
            {
              assertions < MAGIC_NUMBER ? (
                <h3
                  className="feedback-text"
                  data-testid="feedback-text"
                >
                  Could be better...

                </h3>
              ) : (
                <h3
                  className="feedback-text"
                  data-testid="feedback-text"
                >
                  Well Done!
                </h3>
              )
            }
            <div className="feedback-questions">
              <p
                data-testid="feedback-total-question"
              >
                {`You're right ${assertions} questions!`}
              </p>
              <p data-testid="feedback-total-score">
                {`A total of ${score} points`}
              </p>
            </div>
          </div>
          <div className="feedback-btn">
            <button
              className="btn-play-again"
              data-testid="btn-play-again"
              type="button"
              onClick={ this.hanleClick2 }
            >
              Play Again

            </button>

            <button
              type="button"
              className="btn-ranking"
              onClick={ this.hanleClick3 }
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </div>
        </div>
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
