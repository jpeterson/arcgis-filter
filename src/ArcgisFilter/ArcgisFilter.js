import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Set from './containers/Set';
import FilterPreviewer from './components/FilterPreviewer';

import { getFields, generateId } from './utils/genericUtils';
import { buildFilter } from './utils/sqlUtils';
import expressionTemplate from './defaults/expression';

import { ThemeProvider } from 'styled-components';
import CalciteTheme from 'calcite-react/theme/CalciteTheme';

import Panel from 'calcite-react/Panel';
import Button from 'calcite-react/Button';
import Radio from 'calcite-react/Radio';
import { Fieldset, Legend } from 'calcite-react/Form';

class ArcgisFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mustMatchAll: true,
      sets: {
        [generateId()]: {
          mustMatchAll: true,
          expressions: {
            [generateId()]: expressionTemplate
          }
        }
      }
    };
  }

  componentDidMount() {
    const fields = getFields(this.props.fields);
    this.setState({ fields });
  }

  onChange = state => {
    const filter = buildFilter(state);
    this.props.onChange(filter);
  };

  updateSets = sets => {
    this.setState({ sets }, () => {
      this.onChange(this.state);
    });
  };

  updateSetOperator = mustMatchAll => {
    this.setState({ mustMatchAll });
  };

  handleAddSet = () => {
    const { sets } = this.state;
    sets[generateId()] = {
      mustMatchAll: true,
      expressions: {
        [generateId()]: expressionTemplate
      }
    };
    this.updateSets(sets);
  };

  handleRemoveSet = setId => {
    const { sets } = this.state;
    delete sets[setId];
    this.updateSets(sets);
  };

  handleUpdateSetOperator = (setId, setOperator) => {
    const { sets } = this.state;
    sets[setId].mustMatchAll = setOperator;
    this.updateSets(sets);
  };

  handleAddExpression = setId => {
    const { sets } = this.state;
    sets[setId].expressions[generateId()] = expressionTemplate;
    this.updateSets(sets);
  };

  handleRemoveExpression = (setId, expressionId) => {
    const { sets } = this.state;
    delete sets[setId].expressions[expressionId];
    this.updateSets(sets);
  };

  handleUpdateExpression = (setId, expression) => {
    const { sets } = this.state;
    const currentExpression = sets[setId].expressions[expression.id];
    sets[setId].expressions[expression.id] = {
      ...currentExpression,
      ...expression
    };
    this.updateSets(sets);
  };

  handleUpdateFilterOperator = mustMatchAll => {
    this.updateSetOperator(mustMatchAll);
  };

  getSets = sets => {
    return Object.keys(sets).map(key => {
      const set = sets[key];
      return (
        <Set
          key={key}
          id={key}
          fields={this.state.fields}
          mustMatchAll={set.mustMatchAll}
          expressions={set.expressions}
          updateExpression={this.handleUpdateExpression}
          onFieldChange={this.handleFieldChanged}
          onOperatorChange={this.handleOperatorChanged}
          onValueChange={this.handleValueChanged}
          updateSetOperator={this.handleUpdateSetOperator}
          removeSet={this.handleRemoveSet}
          addExpression={this.handleAddExpression}
          removeExpression={this.handleRemoveExpression}
        />
      );
    });
  };

  render() {
    if (!this.state.fields) {
      return null;
    }

    return (
      <ThemeProvider theme={CalciteTheme}>
        <Panel white>
          <Fieldset
            style={{ textAlign: 'right', fontSize: '.8em' }}
            name="filter-operator"
            horizontal
          >
            <Legend>Set Operator:</Legend>
            <Radio
              checked={this.state.mustMatchAll}
              onChange={() => this.handleUpdateFilterOperator(true)}
            >
              AND
            </Radio>{' '}
            <Radio
              checked={!this.state.mustMatchAll}
              onChange={() => this.handleUpdateFilterOperator(false)}
            >
              OR
            </Radio>
          </Fieldset>
          {this.getSets(this.state.sets)}
          <FilterPreviewer
            options={{
              mustMatchAll: this.state.mustMatchAll,
              sets: this.state.sets
            }}
          />
          <Button onClick={this.handleAddSet}>Add Set</Button>
        </Panel>
      </ThemeProvider>
    );
  }
}

ArcgisFilter.propTypes = {
  /** ArcGIS REST API or JSAPI fields definition object */
  fields: PropTypes.object.isRequired,
  /** Fired when the filter changes. Receives the filter string as an argument  */
  onChange: PropTypes.func
};

ArcgisFilter.defaultProps = {};

export default ArcgisFilter;
