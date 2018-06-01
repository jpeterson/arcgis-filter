import React from 'react';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

const UniqueValueChooser = props => {
  return (
    <Select
      style={{ whiteSpace: 'nowrap', width: '100%' }}
      menuStyle={{ maxHeight: '400px' }}
      filterable
    >
      <MenuItem>Coming Soon!</MenuItem>
      <MenuItem />
    </Select>
  );
};

export default UniqueValueChooser;
