import { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handlechange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
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
            >
              Play
            </button>
          </form>
        </main>
      </div>
    );
  }
}
export default Login;
