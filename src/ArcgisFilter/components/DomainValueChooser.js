import React from 'react';

import { find } from 'lodash';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

const DomainValueChooser = props => {
  const handleOnChange = code => {
    props.onChange(find(props.codedValues, { code }));
  };

  const getOptions = codedValues => {
    return codedValues.map(codedValue => {
      return (
        <MenuItem value={codedValue.code} key={codedValue.name}>
          {codedValue.name}
        </MenuItem>
      );
    });
  };

  return (
    <Select selectedValue={props.selectedValue.code} onChange={handleOnChange}>
      {getOptions(props.codedValues)}
    </Select>
  );
};

export default DomainValueChooser;
