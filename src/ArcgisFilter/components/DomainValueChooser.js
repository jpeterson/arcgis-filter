import React from 'react';

import { find } from 'lodash';

const DomainValueChooser = props => {
  const handleOnChange = e => {
    props.onChange(find(props.codedValues, { code: e.target.value }));
  };

  const getOptions = codedValues => {
    return codedValues.map(codedValue => {
      return (
        <option value={codedValue.code} key={codedValue.name}>
          {codedValue.name}
        </option>
      );
    });
  };

  return (
    <select value={props.selectedValue.code} onChange={handleOnChange}>
      {getOptions(props.codedValues)}
    </select>
  );
};

export default DomainValueChooser;
