import React from 'react';
import PropTypes from 'prop-types';

import './material-select.scss';

const MaterialSelect = ({
  name,
  defaultValue,
  options,
  handleChange,
  errors,
}) => {
  const handleClick = event => {
    const value = JSON.parse(event.target.value);
    handleChange({ target: { name, value } });
  };

  return (
    <div className="material-select-input">
      <div className="mdl-selectfield">
        <label>Standard Select</label>
        <select
          className="browser-default"
          defaultValue={defaultValue}
          onChange={event => handleClick(event)}
        >
          {options.map((item, index) => (
            <option key={index} value={JSON.stringify(item)}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <small className="text-danger">{errors[name]}</small>
    </div>
  );
};

MaterialSelect.defaultProps = {
  defaultValue: 'select...',
  errors: {},
};

MaterialSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
};

export default MaterialSelect;
