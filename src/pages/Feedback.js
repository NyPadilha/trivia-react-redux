import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const MAGIC_NUMBER = 140;
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        { score <= MAGIC_NUMBER ? (
          <h3 data-testid="feedback-text">Could be better...</h3>)
          : <h3 data-testid="feedback-text">Well Done!</h3>}
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
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
