import React from 'react';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

import { getGenericFieldType } from '../utils/genericUtils';

const FieldChooser = props => {
  const handleOnChange = field => {
    props.onChange(props.fields[field]);
  };

  const getFieldType = esriFieldType => {
    const shortFieldType = getGenericFieldType(esriFieldType);

    return (
      shortFieldType.charAt(0).toUpperCase() +
      shortFieldType.substr(1).toLowerCase()
    );
  };

  const getOptions = fields => {
    return Object.keys(fields).map(key => {
      const field = fields[key];
      return (
        <MenuItem
          value={key}
          key={key}
          title={key}
          subtitle={getFieldType(field.type)}
        >
          {field.alias || key}
        </MenuItem>
      );
    });
  };

  return (
    <Select
      fullWidth
      style={{ whiteSpace: 'nowrap', width: '100%' }}
      menuStyle={{ maxHeight: '400px' }}
      filterable
      selectedValue={props.selectedField && props.selectedField.name}
      onChange={handleOnChange}
      placeholder="Select Field..."
    >
      {getOptions(props.fields)}
    </Select>
  );
};

export default FieldChooser;
