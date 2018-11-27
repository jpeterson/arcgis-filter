import React, { Component } from 'react';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

import ValueInput from '../components/ValueInput';

class RelativeDateChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSizeValue: {
        code: 1,
        value: 1
      },
      timeSpanValue: 'minutes'
    };
  }

  handleValueChange = e => {
    console.log(e);
    // props.onChange(e);
    this.setState({
      timeSizeValue: e
    });
  };

  handleOptionChange = e => {
    console.log(e);
    // props.onChange(e);
    this.setState({
      timeSpanValue: e
    });
  };

  render() {
    // TODO: get timeSizeValue from props?
    // TODO: get timeSpanValue from props?

    return (
      <div>
        <ValueInput
          style={style.valueInput}
          value={this.state.timeSizeValue}
          type="number"
          onChange={this.handleValueChange}
        />
        <Select
          style={style.select}
          selectedValue={this.state.timeSpanValue}
          onChange={this.handleOptionChange}
        >
          <MenuItem value="minutes">minute(s)</MenuItem>
          <MenuItem value="hours">hour(s)</MenuItem>
          <MenuItem value="days">day(s)</MenuItem>
          <MenuItem value="weeks">week(s)</MenuItem>
          <MenuItem value="months">month(s)</MenuItem>
          <MenuItem value="years">year(s)</MenuItem>
        </Select>
      </div>
    );
  }
}

const style = {
  valueInput: {
    flex: '0 0 80px'
  },
  select: {
    flex: '0 0 80px'
  }
};

export default RelativeDateChooser;
