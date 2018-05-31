import React from 'react';

const ValueInput = props => {
  const handleOnChange = e => {
    console.log(e.target.value);
    props.onChange({
      name: e.target.value,
      code: e.target.value
    });
  };

  const getElement = type => {
    switch (type) {
      case 'string':
        return (
          <input
            value={props.value.code}
            onChange={handleOnChange}
            type="text"
          />
        );
      case 'number':
        return (
          <input
            value={props.value.code}
            onChange={handleOnChange}
            type="number"
          />
        );
      case 'date':
        return (
          <input
            value={props.value.code}
            onChange={handleOnChange}
            type="date"
          />
        );
      default:
    }
  };

  return getElement(props.type);
};

export default ValueInput;
