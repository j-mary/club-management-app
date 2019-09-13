import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './NotFound.scss';

const NotFound = ({ history }) => (
  <div className="custom-warning-error-bgColor">
    <h2 className="custom-warning-text">404</h2>
    <div className="custom-warning-heading">
      <span>Oops. {"There's"} nothing here.</span>
    </div>
    <div className="custom-warning-body">
      <span>
        The page no longer exists or the link may be broken. But {"don't"}{' '}
        worry, you can always return from whence you came.
      </span>
      <Link to="/">Go back home</Link>
    </div>
  </div>
);

export default NotFound;

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
