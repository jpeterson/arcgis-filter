import React from 'react';

const FieldChooser = props => {
  const handleOnChange = e => {
    props.onChange(props.fields[e.target.value]);
  };

  const getOptions = fields => {
    return Object.keys(fields).map(key => {
      return (
        <option value={key} key={key}>
          {key}
        </option>
      );
    });
  };

  return (
    <select value={props.selectedField.name} onChange={handleOnChange}>
      {getOptions(props.fields)}
    </select>
  );
};

export default FieldChooser;
