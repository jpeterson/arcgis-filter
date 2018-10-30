import React, { Component } from 'react';
import moment from 'moment';

import TextField from 'calcite-react/TextField';
import DatePicker from 'calcite-react/DatePicker';

class ValueInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerFocused: false
    };
  }

  onFocusChange = ({ focused }) => {
    this.setState({
      datePickerFocused: focused
    });
  };

  handleOnChange = e => {
    this.props.onChange({
      name: e.target.value,
      code: e.target.value
    });
  };

  handleOnDateChange = e => {
    this.props.onChange({
      name: e,
      code: e
    });
  };

  getMomentDate = date => {
    if (date && date !== '') {
      return moment(date);
    }

    return moment();
  };

  getElement = type => {
    switch (type) {
      case 'string':
        return (
          <TextField
            value={this.props.value.code}
            onChange={this.handleOnChange}
          />
        );
      case 'number':
        return (
          <TextField
            value={this.props.value.code}
            onChange={this.handleOnChange}
            type="number"
          />
        );
      case 'date':
      case 'epoch':
        return (
          <DatePicker
            date={this.getMomentDate(this.props.value.code)}
            isOutsideRange={() => false}
            numberOfMonths={1}
            anchorDirection="right"
            onDateChange={this.handleOnDateChange}
            focused={this.state.datePickerFocused}
            onFocusChange={this.onFocusChange}
          />
        );
      default:
        return (
          <TextField
            disabled
            value={this.props.value.code}
            onChange={this.handleOnChange}
          />
        );
    }
  };

  render() {
    return this.getElement(this.props.type);
  }
}

export default ValueInput;
