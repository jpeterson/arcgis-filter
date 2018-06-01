import React, { Component } from 'react';

import FieldChooser from '../components/FieldChooser';
import OperatorChooser from '../components/OperatorChooser';
import ValueInput from '../components/ValueInput';
import UniqueValueChooser from '../components/UniqueValueChooser';
import ValueTypeChooser from '../components/ValueTypeChooser';
import DomainValueChooser from '../components/DomainValueChooser';

import { FormControl, Fieldset } from 'calcite-react/Form';
import Panel from 'calcite-react/Panel';
import Button from 'calcite-react/Button';
import Tooltip from 'calcite-react/Tooltip';
import DeleteIcon from '../icons/DeleteIcon';

import {
  getValidOperators,
  getDefaultFilterValue,
  getGenericFieldType
} from '../utils/genericUtils';

const formControlStyles = {
  marginBottom: '5px'
};

class Expression extends Component {
  componentDidMount() {
    // Kinda nasty, but grabs the "first" property in the fields object
    // in the same way the FieldChooser will.
    // const field = this.props.fields[Object.keys(this.props.fields)[0]];
    // this.setOptionsFromField(field);
  }

  updateExpression = updates => {
    const id = this.props.id;
    this.props.updateExpression({ ...updates, id });
  };

  removeExpression = () => {
    const id = this.props.id;
    this.props.removeExpression(id);
  };

  handleFieldChanged = field => {
    this.setOptionsFromField(field);
  };

  handleOperatorChanged = operator => {
    this.updateExpression({ operator });
  };

  handleValueChanged = value => {
    this.updateExpression({ value });
  };

  handleValueTypeChanged = valueType => {
    this.updateExpression({ valueType });
  };

  setOptionsFromField = field => {
    const operator = getValidOperators(field.type)[0];
    const value = getDefaultFilterValue(field);

    this.updateExpression({
      field,
      value,
      operator
    });

    this.setState({
      field,
      value,
      operator
    });
  };

  getValueTypeChooser = (valueType, disableUnique) => {
    if (disableUnique) return null;
    return (
      <ValueTypeChooser
        id={this.props.id}
        selectedValueType={valueType}
        onChange={this.handleValueTypeChanged}
      />
    );
  };

  getValueElement = expressionDef => {
    const { valueType, field, operator, value } = expressionDef;

    // Operator does not require a value
    if (operator && operator.omitValue) return null;

    // TODO: need to implement this
    if (valueType === 'unique') {
      return <UniqueValueChooser />;
    }

    // NOTE: only supporting coded value domains for now
    if (field && field.domain && field.domain.codedValues) {
      return (
        <DomainValueChooser
          codedValues={field.domain.codedValues}
          selectedValue={value || getDefaultFilterValue(field)}
          onChange={this.handleValueChanged}
        />
      );
    }

    // Freeform input
    return (
      <ValueInput
        value={value}
        type={getGenericFieldType(field && field.type)}
        onChange={this.handleValueChanged}
      />
    );
  };

  render() {
    if (!this.props.fields) return null;

    const { field, operator, valueType } = this.props.expressionDef;

    return (
      <Panel style={{ backgroundColor: '#f6fdff' }}>
        <Fieldset name={`expression-${this.props.id}`} horizontal>
          <FormControl style={{ flex: '1 0 150px', ...formControlStyles }}>
            <FieldChooser
              selectedField={field}
              fields={this.props.fields}
              onChange={this.handleFieldChanged}
            />
          </FormControl>
          <FormControl style={formControlStyles}>
            <OperatorChooser
              selectedOperator={operator}
              operators={getValidOperators(field && field.type)}
              onChange={this.handleOperatorChanged}
            />
          </FormControl>
          <FormControl style={{ flex: '1 0 150px', ...formControlStyles }}>
            {this.getValueElement(this.props.expressionDef)}
          </FormControl>
          <FormControl style={formControlStyles}>
            {this.getValueTypeChooser(valueType, this.props.disableUnique)}
          </FormControl>
          <FormControl style={formControlStyles}>
            <Tooltip title="Remove Expression">
              <Button
                style={{ margin: '0.25rem 0 0 0' }}
                iconButton
                icon={<DeleteIcon />}
                onClick={this.removeExpression}
              />
            </Tooltip>
          </FormControl>
        </Fieldset>
      </Panel>
    );
  }
}

export default Expression;
