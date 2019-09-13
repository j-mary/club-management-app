import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Signin.scss';

import { validateAField, validateAllFields } from '../helpers/validateFields';
import signinInterface from '../helpers/signinInterface.json';
import { signIn } from '../helpers/formData.json';
import authenticate from '../actionCreators/authenticate';
import SigninForm from './SigninForm';

const Signin = ({ authenticateUser, history, errorMessage }) => {
  const [validationErrors, setValidationErrors] = useState(signinInterface);
  const [inputData, setInputData] = useState(signinInterface);
  const [isRequested, setIsRequest] = useState(false);

  const errorMsg = isRequested ? errorMessage : '';

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name, true);
    setInputData({
      ...inputData,
      ...newFieldData,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message,
    });
  };

  const validateOnClick = newValidationErrors => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationErrors,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      setIsRequest(true);
      authenticateUser('/user/signin', inputData, () => history.push('dashboard'))
    }
  };

  return (
    <div className="signin-component">
      <div className="signin-form">
        <SigninForm
          domProps={signIn}
          actionButtonText="Login"
          errors={validationErrors}
          errorMessage={errorMsg}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
      <div>
        Don't have an account?
        <Link to="register"> Register</Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authenticationReducer: { errorMessage } }) => ({
  errorMessage,
});

export default connect(
  mapStateToProps,
  { authenticateUser: authenticate },
)(Signin);

Signin.defaultProps = {
  errorMessage: '',
};

Signin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  errorMessage: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired,
};
