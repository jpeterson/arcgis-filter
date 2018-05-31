import React, { Component } from 'react';

import Set from './containers/Set';
import FilterPreviewer from './components/FilterPreviewer';

import { getFields, generateId } from './utils/genericUtils';
import expressionTemplate from './defaults/expression.json';

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

  handleFieldChanged = field => {
    this.setState({ field });
  };

  handleOperatorChanged = operator => {
    this.setState({ operator });
  };

  handleValueChanged = value => {
    this.setState({ value });
  };

  handleAddSet = () => {
    const { sets } = this.state;
    sets[generateId()] = {
      mustMatchAll: true,
      expressions: {
        [generateId()]: expressionTemplate
      }
    };
    this.setState({ sets });
  };

  handleRemoveSet = setId => {
    const { sets } = this.state;
    delete sets[setId];
    this.setState({ sets });
  };

  handleAddExpression = setId => {
    const { sets } = this.state;
    sets[setId].expressions[generateId()] = expressionTemplate;
    this.setState({ sets });
  };

  handleRemoveExpression = (setId, expressionId) => {
    const { sets } = this.state;
    delete sets[setId].expressions[expressionId];
    this.setState({ sets });
  };

  handleUpdateExpression = (setId, expression) => {
    const { sets } = this.state;
    const currentExpression = sets[setId].expressions[expression.id];
    sets[setId].expressions[expression.id] = {
      ...currentExpression,
      ...expression
    };
    this.setState({ sets });
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
      <div
        style={{ border: '3px dashed blue', padding: '10px', margin: '10px' }}
      >
        {this.getSets(this.state.sets)}
        <FilterPreviewer
          options={{
            mustMatchAll: this.state.mustMatchAll,
            sets: this.state.sets
          }}
        />
        <button onClick={this.handleAddSet}>Add Set</button>
      </div>
    );
  }
}

export default ArcgisFilter;
