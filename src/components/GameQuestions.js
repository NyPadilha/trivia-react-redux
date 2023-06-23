import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { returnQuestions } from '../helpers/API';
import { addQuestions } from '../redux/actions';

class GameQuestions extends Component {
  async componentDidMount() {
    const code = 3;
    const { questions, dispatch } = this.props;
    const token = localStorage.getItem('token');
    const response = await returnQuestions(token);
    dispatch(addQuestions(response));
    if (questions.response_code === code) {
      window.location = '/';
      localStorage.clear();
    }
  }

  render() {
    const { questions: { results } } = this.props;
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
              data-testid="answers-options"
            >
              <button data-testid="correct-answer">{results[0].correct_answer}</button>
              { results[0].incorrect_answers
                .map((item, index) => (
                  <button
                    key={ index }
                    data-testid={ `wrong-answer-${index}` }
                  >
                    {item}

                  </button>
                ))}
            </div>
          </div>
        )
        }
      </div>

    );
  }
}

const mapStateToProps = ({ question: { questions } }) => ({
  questions,
});

GameQuestions.propTypes = PropTypes.shape({}).isRequired;

export default connect(mapStateToProps)(GameQuestions);
