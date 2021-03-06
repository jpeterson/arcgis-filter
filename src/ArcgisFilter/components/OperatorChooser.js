import React from 'react';

import { find } from 'lodash';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

const OperatorChooser = props => {
  const handleOnChange = value => {
    props.onChange(find(props.operators, { alias: value }));
  };

  const getOptions = operators => {
    return operators.map(operator => {
      return (
        <MenuItem value={operator.alias} key={operator.alias}>
          {operator.alias}
        </MenuItem>
      );
    });
  };

  return (
    <Select
      style={style.select}
      selectedValue={props.selectedOperator && props.selectedOperator.alias}
      disabled={!props.operators.length}
      onChange={handleOnChange}
    >
      {getOptions(props.operators)}
    </Select>
  );
};

const style = {
  select: {
    flex: '0 0 80px'
  }
};

export default OperatorChooser;
