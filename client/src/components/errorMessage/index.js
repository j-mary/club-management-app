import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  if (message) {
    return (
      // eslint-disable-next-line max-len
      <div className="text-danger help-block text-center server-error error-message">
        {message}
      </div>
    );
  }
  return null;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
