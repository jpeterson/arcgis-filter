import React from 'react';
import moment from 'moment';

import TextField from 'calcite-react/TextField';
import DatePicker from 'calcite-react/DatePicker';

const ValueInput = props => {
  const handleOnChange = e => {
    props.onChange({
      name: e.target.value,
      code: e.target.value
    });
  };

  const getElement = type => {
    switch (type) {
      case 'string':
        return <TextField value={props.value.code} onChange={handleOnChange} />;
      case 'number':
        return (
          <TextField
            value={props.value.code}
            onChange={handleOnChange}
            type="number"
          />
        );
      case 'date':
        return (
          <TextField
            value={props.value.code}
            onChange={handleOnChange}
            type="date"
          />
        );
      default:
        return (
          <TextField
            disabled
            value={props.value.code}
            onChange={handleOnChange}
          />
        );
    }
  };

  return getElement(props.type);
};

export default ValueInput;
