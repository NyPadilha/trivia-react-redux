import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const MAGIC_NUMBER = 140;
    const { score } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        { score <= MAGIC_NUMBER ? (
          <h3 data-testid="feedback-text">Could be better...</h3>)
          : <h3 data-testid="feedback-text">Well Done!</h3>}
      </div>
    );
  }
}

const mapStateToProps = ({ player: { score } }) => ({
  score,
});

Feedback.propTypes = PropTypes.shape({}).isRequired;

export default connect(mapStateToProps)(Feedback);
