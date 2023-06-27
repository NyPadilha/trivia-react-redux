import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';
import { returnToken } from '../helpers/API';
import './Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handlechange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const time = 1500;
    const { history, dispatch } = this.props;
    dispatch(addUser(this.state));
    const token = await returnToken();
    localStorage.setItem('token', token);
    setTimeout(() => {
      history.push('/gameScreen');
    }, time);
    const { score, name } = this.props;
    const verifRanking = JSON.parse(localStorage.getItem('ranking'));
    if (verifRanking) {
      const newRanking = [
        ...verifRanking,
        {
          name,
          score,
        },
      ];
      localStorage.setItem(
        'ranking',
        JSON.stringify(newRanking),
      );
    } else {
      const ranking = [
        {
          name,
          score,
        },
      ];
      localStorage.setItem(
        'ranking',
        JSON.stringify(ranking),
      );
    }
  };

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div className="login-contain">
        <div className="logo">TRIVIA</div>
        <main>
          <form className="form-contain">
            <label>
              Name:
              <input
                type="text"
                name="name"
                className="input-name"
                placeholder="Qual é o seu nome?"
                data-testid="input-player-name"
                onChange={ this.handlechange }
              />
            </label>
            <label>
              E-mail:
              <input
                className="input-email"
                type="email"
                name="email"
                placeholder="Qual é o seu e-mail do gravatar?"
                data-testid="input-gravatar-email"
                onChange={ this.handlechange }
              />
            </label>
            <button
              className="btn-play"
              type="button"
              disabled={ !name || !email }
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Play
            </button>
            <button
              className="btn-settings"
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleClickConfig }
            >
              Configurações
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Login.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Login);
