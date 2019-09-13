import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Register.scss';

import { validateAField, validateAllFields } from '../helpers/validateFields';
import signinInterface from '../helpers/signinInterface.json';
import { register } from '../helpers/formData.json';
import authenticate from '../actionCreators/authenticate';
import RegisterForm from './RegisterForm';

const Register = () => {
    return (
        <div>
            Register Page
        </div>
    )
}

export default Register
