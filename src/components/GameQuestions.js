import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleArray } from '../helpers/featFunctions';
import { addQuestions, addScore } from '../redux/actions';
import './GameQuestions.css';
import { returnQuestions } from '../helpers/API';

class GameQuestions extends Component {
  state = {
    timer: 30,
    answered: false,
    disabled: false,
    correct: [],
    questions: [],
    solutions: [],
    index: 0,
  };

  async componentDidMount() {
    const num = 1000;
    const code = 3;
    const token = localStorage.getItem('token');
    const response = await returnQuestions(token);
    const { history, dispatch } = this.props;
    dispatch(addQuestions(response.results));
    const intervalId = setInterval(() => {
      const { timer, answered } = this.state;
      if (timer > 0 && answered === false) {
        this.setState(() => ({
          timer: timer - 1,
        }));
      } else {
        clearInterval(intervalId);
        this.setState({
          disabled: true,
        });
      }
    }, num);
    if (response.response_code === code) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({
        correct: response.results[0].correct_answer,
        questions: response.results,
        solutions: shuffleArray([...response.results[0].incorrect_answers,
          response.results[0].correct_answer]),
      });
    }
  }

  handleTime = () => {
    const num = 1000;
    const intervalId = setInterval(() => {
      const { timer, answered } = this.state;
      if (timer > 0 && answered === false) {
        this.setState(() => ({
          timer: timer - 1,
        }));
      } else {
        clearInterval(intervalId);
        this.setState({
          disabled: true,
        });
      }
    }, num);
  };

  handleAnswer = (Correct) => {
    const { answered } = this.state;
    const { dispatch } = this.props;
    const num = 10;
    const dif1 = 3;
    const dif2 = 2;
    const dif3 = 1;
    const num1 = 30;
    const num2 = 20;
    const num3 = 0;
    if (answered === false) {
      this.setState({
        answered: true,
        disabled: true,
      });
      if (Correct === true) {
        console.log('Resposta correta! + 10 pontos');
        const { timer } = this.state;
        if (timer < num1 && timer > num2) {
          const att = num + (timer * dif1);
          dispatch(addScore(att));
        } else if (timer < num2 && timer > num3) {
          const att = num + (timer * dif2);
          dispatch(addScore(att));
        } else {
          const att = num + (timer * dif3);
          dispatch(addScore(att));
        }
      } else {
        console.log('Resposta incorreta!');
      }
    }
  };

  handleColor = (disabled, item) => {
    const { correct } = this.state;
    if (disabled) {
      if (correct === item) {
        return 'correct';
      } return 'wrong';
    } return '';
  };

  nextQuestion = () => {
    const MAGIC_NUMBER = 4;
    const { history, questions } = this.props;
    const { index } = this.state;
    if (index === MAGIC_NUMBER) history.push('/feedback');
    const indexUpped = index === 0 ? 1 : index;
    this.setState({
      timer: 30,
      index: index + 1,
      answered: false,
      disabled: false,
      correct: questions[indexUpped].correct_answer,
      solutions: shuffleArray([...questions[indexUpped].incorrect_answers,
        questions[indexUpped].correct_answer]),
    });
  };

  hanleClick2 = () => {
    const { history } = this.props;
    history.push('/');
  };

  hanleClick3 = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { correct, timer, disabled, questions, solutions, index } = this.state;
    return (
      <div className="game-contain">
        {
          questions.length > 0
          && (
            <div className="game-questions">
              <div className="logo game-logo">TRIVIA</div>
              <div className="questions-contain">
                <p
                  className="category"
                  data-testid="question-category"
                >
                  {questions[index].category}
                </p>
                <p
                  className="question"
                  data-testid="question-text"
                >
                  {questions[index].question}
                </p>
                <div className="time">{`Tempo: ${timer}s`}</div>
              </div>
              <div>
                <div
                  className="answers-options"
                  data-testid="answer-options"
                >
                  {
                    solutions.map((item, number) => (
                      <button
                        type="button"
                        disabled={ disabled }
                        onClick={ () => {
                          if (item === correct) {
                            this.handleAnswer(true);
                          } else {
                            this.handleAnswer(false);
                          }
                        } }
                        key={ number }
                        data-testid={ correct === item
                          ? 'correct-answer' : `wrong-answer-${number}` }
                        className={ `answer ${this.handleColor(disabled, item)}` }
                      >
                        {item}
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          )
        }
        <div className="footer">
          <div className="btn-contain">
            <button
              className="btn-play-again btn"
              type="button"
              onClick={ this.hanleClick2 }
              data-testid="btn-play-again"
            >
              Play Again
            </button>
            <button
              className="btn-ranking btn"
              type="button"
              onClick={ this.hanleClick3 }
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </div>
          <div className="btn-contain-next">
            { disabled && (
              <button
                type="button"
                className="btn-next btn"
                data-testid="btn-next"
                onClick={ () => {
                  this.nextQuestion();
                  this.handleTime();
                } }
              >
                Next
              </button>
            )}
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ question: { questions }, arraySolution: { solutions } }) => ({
  questions, solutions,
});
GameQuestions.propTypes = PropTypes.shape({}).isRequired;
export default connect(mapStateToProps)(GameQuestions);
