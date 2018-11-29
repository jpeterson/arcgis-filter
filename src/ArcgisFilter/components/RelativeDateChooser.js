import React, { Component } from 'react';

import Select from 'calcite-react/Select';
import { MenuItem } from 'calcite-react/Menu';

import ValueInput from '../components/ValueInput';

class RelativeDateChooser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        timeSizeValue: 1,
        timeSpanValue: 'days'
      }
    };
  }

  componentDidMount() {
    this.setState(
      {
        value: {
          timeSizeValue: Number(this.props.value.timeSizeValue),
          timeSpanValue: this.props.value.timeSpanValue
        }
      },
      () => this.props.onChange(this.state.value)
    );
  }

  handleNumberValueChange = e => {
    this.setState(
      {
        value: {
          ...this.state.value,
          timeSizeValue: Number(e.code)
        }
      },
      () => this.props.onChange(this.state.value)
    );
  };

  handleSelectOptionChange = e => {
    this.setState(
      {
        value: {
          ...this.state.value,
          timeSpanValue: e
        }
      },
      () => this.props.onChange(this.state.value)
    );
  };

  render() {
    return (
      <div>
        <ValueInput
          style={style.valueInput}
          value={this.state.value.timeSizeValue}
          type="number"
          onChange={this.handleNumberValueChange}
        />
        <Select
          style={style.selectInput}
          selectedValue={this.state.value.timeSpanValue}
          onChange={this.handleSelectOptionChange}
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
    // overrides here?
  },
  select: {
    // overrides here?
  }
};

export default RelativeDateChooser;
