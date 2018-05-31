import React, { Component } from 'react';

import FieldChooser from '../components/FieldChooser';
import OperatorChooser from '../components/OperatorChooser';
import ValueInput from '../components/ValueInput';
import UniqueValueChooser from '../components/UniqueValueChooser';
import ValueTypeChooser from '../components/ValueTypeChooser';
import DomainValueChooser from '../components/DomainValueChooser';
import ExpressionPreviewer from '../components/ExpressionPreviewer';

import {
  getValidOperators,
  getDefaultFilterValue,
  getGenericFieldType
} from '../utils/genericUtils';

class Expression extends Component {
  componentDidMount() {
    // Kinda nasty, but grabs the "first" property in the fields object
    // in the same way the FieldChooser will.
    const field = this.props.fields[Object.keys(this.props.fields)[6]];
    this.setOptionsFromField(field);
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
    this.setState({ operator });
  };

  handleValueChanged = value => {
    this.updateExpression({ value });
    this.setState({ value });
  };

  handleValueTypeChanged = valueType => {
    this.updateExpression({ valueType });
    this.setState({ valueType });
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

  getValueElement = expressionDef => {
    const { valueType, field, operator, value } = expressionDef;

    // Operator does not require a value
    if (operator.omitValue) return null;

    // TODO: need to implement this
    if (valueType === 'unique') {
      return <UniqueValueChooser />;
    }

    // NOTE: only supporting coded value domains for now
    if (field.domain && field.domain.codedValues) {
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
        type={getGenericFieldType(field.type)}
        onChange={this.handleValueChanged}
      />
    );
  };

  render() {
    if (!this.props.expressionDef.field) return null;

    const { field, operator, valueType } = this.props.expressionDef;

    return (
      <div
        style={{ border: '3px dashed lime', padding: '10px', margin: '10px' }}
      >
        <FieldChooser
          selectedField={field}
          fields={this.props.fields}
          onChange={this.handleFieldChanged}
        />
        <OperatorChooser
          selectedOperator={operator}
          operators={getValidOperators(field.type)}
          onChange={this.handleOperatorChanged}
        />
        {this.getValueElement(this.props.expressionDef)}
        <ValueTypeChooser
          id={this.props.id}
          selectedValueType={valueType}
          onChange={this.handleValueTypeChanged}
        />
        <hr />
        <ExpressionPreviewer options={this.props.expressionDef} />
        <button onClick={this.removeExpression}>Remove Expression</button>
      </div>
    );
  }
}

export default Expression;
