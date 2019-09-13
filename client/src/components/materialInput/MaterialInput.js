import React from 'react';
import PropTypes from 'prop-types';

import './material-input.scss';

const MaterialInput = ({
  name,
  type,
  label,
  placeholder,
  defaultValue,
  handleChange,
  errors,
  classNames,
}) => (
  <div key={name} id="material-text-field">
    <input
      required
      type={type}
      name={name}
      defaultValue={defaultValue}
      onChange={handleChange}
      // eslint-disable-next-line max-len
      className={`${placeholder ? 'hide-on-focus' : ''} text-area ${classNames}`}
      placeholder={placeholder}
    />
    <span className="highlight" />
    <span className="bar" />
    <label htmlFor={name}>{label}</label>
    <small className="text-error">{errors[name]}</small>
  </div>
);

MaterialInput.defaultProps = {
  placeholder: '',
  type: 'text',
  errors: {},
  classNames: '',
  defaultValue: '',
};

MaterialInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.string),
  classNames: PropTypes.string,
};

export default MaterialInput;
