import React from 'react';

const ValueTypeChooser = props => {
  const handleOptionChange = e => {
    props.onChange(e.target.value);
  };

  return (
    <div>
      <label>
        <input
          value="value"
          name={`value-type-${props.id}`}
          type="radio"
          checked={props.selectedValueType === 'value'}
          onChange={handleOptionChange}
        />
        Value
      </label>
      <label>
        <input
          value="unique"
          name={`value-type-${props.id}`}
          type="radio"
          checked={props.selectedValueType === 'unique'}
          onChange={handleOptionChange}
        />
        Unique
      </label>
    </div>
  );
};

export default ValueTypeChooser;
