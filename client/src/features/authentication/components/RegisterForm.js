import React from 'react';

import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import MaterialInput from '../../../components/materialInput/MaterialInput';
import ErrorMessage from '../../../components/errorMessage';

const RegisterForm = ({
  domProps,
  actionButtonText,
  errors,
  errorMessage,
  handleSubmit,
  handleChange,
}) => (
  <Form>
    {domProps.map(propData => (
      <div key={propData.id}>
        <MaterialInput
          name={propData.name}
          type={propData.type}
          value={propData.defaultValue}
          handleChange={handleChange}
          errors={errors}
          label={propData.label}
          placeholder={propData.placeholder}
        />
      </div>
    ))}
    <ErrorMessage message={errorMessage} />
    <button type="button" className="btn btn-success" onClick={handleSubmit}>
      <span>{actionButtonText}</span>
    </button>
  </Form>
);

export default RegisterForm;

RegisterForm.defaultProps = {
  actionButtonText: 'Submit',
  errors: {
    email: '',
    password: '',
  },
  errorMessage: '',
};

RegisterForm.propTypes = {
  domProps: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  actionButtonText: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
