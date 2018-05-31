import React from 'react';

import Expression from './Expression';
import SetPreviewer from '../components/SetPreviewer';

const Set = props => {
  const addExpression = () => {
    props.addExpression(props.id);
  };

  const removeSet = () => {
    props.removeSet(props.id);
  };

  const updateSetOperator = mustMatchAll => {
    props.updateSetOperator(props.id, mustMatchAll);
  };

  const handleRemoveExpression = expressionId => {
    props.removeExpression(props.id, expressionId);
  };

  const handleUpdateExpression = expression => {
    props.updateExpression(props.id, expression);
  };

  const getExpressions = expressions => {
    return Object.keys(expressions).map(key => {
      const expression = expressions[key];
      return (
        <Expression
          key={key}
          id={key}
          expressionDef={expression}
          field={expression.field}
          fields={props.fields}
          updateExpression={handleUpdateExpression}
          removeExpression={handleRemoveExpression}
        />
      );
    });
  };

  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        border: '1px dotted #ddd',
        padding: '10px',
        margin: '10px'
      }}
    >
      <div style={{ textAlign: 'right', fontSize: '.8em' }}>
        Set Operator:{' '}
        <label>
          <input
            value="and"
            name={`and-or-${props.id}`}
            type="radio"
            checked={props.mustMatchAll}
            onChange={() => updateSetOperator(true)}
          />
          AND
        </label>{' '}
        <label>
          <input
            value="or"
            name={`and-or-${props.id}`}
            type="radio"
            checked={!props.mustMatchAll}
            onChange={() => updateSetOperator(false)}
          />
          OR
        </label>
      </div>
      {getExpressions(props.expressions)}
      <SetPreviewer
        options={{
          mustMatchAll: props.mustMatchAll,
          expressions: props.expressions
        }}
      />
      <button onClick={addExpression}>Add Expression</button>
      <button onClick={removeSet}>Remove Set</button>
    </div>
  );
};

export default Set;
