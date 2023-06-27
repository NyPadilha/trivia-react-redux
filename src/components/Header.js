import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleGravatar } from '../helpers/featFunctions';
import './Header.css';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <div className="header-contain">
        <div className="user">
          <img
            className="img-gravatar"
            src={ handleGravatar(gravatarEmail) }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <p
            data-testid="header-player-name"
          >
            {name}
          </p>
        </div>
        <p
          data-testid="header-score"
          className="score"
        >
          {` Pontos: ${score} `}
        </p>
      </div>
    );
  }
}
Header.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name, gravatarEmail, score,
});

export default connect(mapStateToProps)(Header);
