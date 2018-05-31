import React from 'react';

import { find } from 'lodash';

const OperatorChooser = props => {
  const handleOnChange = e => {
    props.onChange(find(props.operators, { alias: e.target.value }));
  };

  const getOptions = operators => {
    return operators.map(operator => {
      return (
        <option value={operator.key} key={operator.alias}>
          {operator.alias}
        </option>
      );
    });
  };

  return (
    <select value={props.selectedOperator.alias} onChange={handleOnChange}>
      {getOptions(props.operators)}
    </select>
  );
};

export default OperatorChooser;
