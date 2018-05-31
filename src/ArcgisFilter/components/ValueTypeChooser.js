import React from 'react';

import Radio from 'calcite-react/Radio';
import { Fieldset } from 'calcite-react/Form';

const ValueTypeChooser = props => {
  const handleOptionChange = e => {
    props.onChange(e.target.value);
  };

  return (
    <Fieldset
      style={{ textAlign: 'right', fontSize: '.8em' }}
      name={`value-type-${props.id}`}
      horizontal
    >
      <Radio
        value="value"
        checked={props.selectedValueType === 'value'}
        onChange={handleOptionChange}
      >
        Value
      </Radio>{' '}
      <Radio
        value="unique"
        checked={props.selectedValueType === 'unique'}
        onChange={handleOptionChange}
      >
        Unique
      </Radio>
    </Fieldset>
  );
};

export default ValueTypeChooser;
