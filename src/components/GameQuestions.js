import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffleArray } from '../helpers/featFunctions';
import { addScore } from '../redux/actions';
import './GameQuestions.css';

class GameQuestions extends Component {
  state = {
    timer: 30,
    answered: false,
    disabled: false,
    correct: [],
    incorrect: [],
  };

  async componentDidMount() {
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
    const code = 3;
    const { questions, history } = this.props;
    if (questions.response_code === code) {
      history.push('/');
      localStorage.clear();
    }
    this.setState({
      correct: questions.results[0].correct_answer,
      incorrect: questions.results[0].incorrect_answers,
    });
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

  render() {
    const { questions: { results } } = this.props;
    const { correct, incorrect, timer, disabled } = this.state;
    const newOptions = [...incorrect, correct];
    return (
      <div>
        {
          results
        && (
          <div>
            <div>{timer}</div>
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
                    className={ disabled && correct === item ? 'correct' : 'wrong' }
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
