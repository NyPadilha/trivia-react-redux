import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleArray } from '../helpers/featFunctions';

class GameQuestions extends Component {
  state = {
    correct: [],
    incorrect: [],
  };

  async componentDidMount() {
    const code = 3;
    const { questions, history } = this.props;
    if (questions.response_code === code) {
      history.push('/');
      localStorage.clear();
    }
    this.setState({ correct: questions.results[0].correct_answer,
      incorrect: questions.results[0].incorrect_answers,
    });
  }

  render() {
    const { questions: { results } } = this.props;
    const { correct, incorrect } = this.state;
    const newOptions = [...incorrect, correct];
    return (
      <div>
        {
          results
        && (
          <div>
            <p
              data-testid="question-category"
            >
              {results[0].category}
            </p>
            <p
              data-testid="question-text"
            >
              {results[0].question}
            </p>
            <div
              data-testid="answer-options"
            >
              {
                shuffleArray(newOptions).map((item, index) => (
                  <button
                    key={ index }
                    data-testid={ correct === item
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>
        )
        }
      </div>

    );
  }
}

const mapStateToProps = ({ question: { questions }, arraySolution: { solutions } }) => ({
  questions, solutions,
});

GameQuestions.propTypes = PropTypes.shape({}).isRequired;

export default connect(mapStateToProps)(GameQuestions);
