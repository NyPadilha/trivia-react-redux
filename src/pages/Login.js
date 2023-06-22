import { Component } from 'react';
import PropTypes from 'prop-types';
import { returnToken } from '../tests/helpers/API';

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
    const { history } = this.props;
    const token = await returnToken();
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/gameScreen');
  };

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <main>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                data-testid="input-player-name"
                onChange={ this.handlechange }
              />
            </label>
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                onChange={ this.handlechange }
              />
            </label>
            <button
              type="button"
              disabled={ !name || !email }
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Play
            </button>
          </form>
          <button
            data-testid="btn-settings"
            onClick={ this.handleClickConfig }
          >
            Configurações
          </button>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
