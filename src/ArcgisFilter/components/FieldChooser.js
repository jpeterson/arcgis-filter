import React from 'react';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

const FieldChooser = props => {
  const handleOnChange = field => {
    props.onChange(props.fields[field]);
  };

  const getOptions = fields => {
    return Object.keys(fields).map(key => {
      return (
        <MenuItem value={key} key={key}>
          {key}
        </MenuItem>
      );
    });
  };

  return (
    <Select selectedValue={props.selectedField.name} onChange={handleOnChange}>
      {getOptions(props.fields)}
    </Select>
  );
};

export default FieldChooser;
