import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleArray } from '../helpers/featFunctions';
import { addScore } from '../redux/actions';
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
  };

  async componentDidMount() {
    const num = 1000;
    const code = 3;
    const token = localStorage.getItem('token');
    const response = await returnQuestions(token);
    const { history } = this.props;
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

  handleAnswer(Correct) {
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
          const rankingString = localStorage.getItem('ranking');
          const ranking = JSON.parse(rankingString);
          ranking[0].score = att;
          const rankingAtualizadoString = JSON.stringify(ranking);
          localStorage.setItem('ranking', rankingAtualizadoString);
          dispatch(addScore(att));
        } else if (timer < num2 && timer > num3) {
          const att = num + (timer * dif2);
          const rankingString = localStorage.getItem('ranking');
          const ranking = JSON.parse(rankingString);
          ranking[0].score = att;
          const rankingAtualizadoString = JSON.stringify(ranking);
          localStorage.setItem('ranking', rankingAtualizadoString);
          dispatch(addScore(att));
        } else {
          const att = num + (timer * dif3);
          const rankingString = localStorage.getItem('ranking');
          const ranking = JSON.parse(rankingString);
          ranking[0].score = att;
          const rankingAtualizadoString = JSON.stringify(ranking);
          localStorage.setItem('ranking', rankingAtualizadoString);
          dispatch(addScore(att));
        }
      } else {
        console.log('Resposta incorreta!');
      }
    }
  }

  handleColor(disabled, item) {
    const { correct } = this.state;
    if (disabled) {
      if (correct === item) {
        return 'correct';
      } return 'wrong';
    } return '';
  }

  nextQuestion() {
    const MAGIC_NUMBER = 4;
    const { history } = this.props;
    const { index } = this.state;
    if (index === MAGIC_NUMBER) history.push('/feedback');
    this.setState({
      index: index + 1,
      answered: false,
      disabled: false,
    });
  }

  render() {
    const { correct, timer, disabled, questions, solutions } = this.state;
    return (
      <div>
        {
          questions.length > 0
        && (
          <div>
            <div>{timer}</div>
            <p
              data-testid="question-category"
            >
              {questions[0].category}
            </p>
            <p
              data-testid="question-text"
            >
              {questions[0].question}
            </p>
            <div
              data-testid="answer-options"
            >
              {
                solutions.map((item, index) => (
                  <button
                    disabled={ disabled }
                    onClick={ () => {
                      if (item === correct) {
                        this.handleAnswer(true);
                      } else {
                        this.handleAnswer(false);
                      }
                    } }
                    key={ index }
                    data-testid={ correct === item
                      ? 'correct-answer' : `wrong-answer-${index}` }
                    className={ this.handleColor(disabled, item) }
                  >
                    {item}
                  </button>
                ))
              }
            </div>
            { disabled && (
              <button
                data-testid="btn-next"
                onClick={ () => this.nextQuestion() }
              >
                Próxima
              </button>
            )}
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
