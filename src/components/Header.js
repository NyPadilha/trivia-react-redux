import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleGravatar } from '../helpers/featFunctions';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <div>
        <img
          src={ handleGravatar(gravatarEmail) }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
        >
          {score}
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
