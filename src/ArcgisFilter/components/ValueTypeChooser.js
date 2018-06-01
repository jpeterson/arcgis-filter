import React from 'react';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

const ValueTypeChooser = props => {
  const handleOptionChange = e => {
    props.onChange(e);
  };

  return (
    <Select
      selectedValue={props.selectedValueType}
      onChange={handleOptionChange}
    >
      <MenuItem value="value">Value</MenuItem>
      <MenuItem value="unique">Unique</MenuItem>
    </Select>
  );
};

export default ValueTypeChooser;
