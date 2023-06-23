import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';
import { returnToken } from '../helpers/API';

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
    setInterval(() => {
      history.push('/gameScreen');
    }, time);
    const { score, name } = this.props;
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

Login.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Login);
