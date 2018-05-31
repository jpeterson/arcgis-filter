import React from 'react';

import Expression from './Expression';
import SetPreviewer from '../components/SetPreviewer';

import Panel from 'calcite-react/Panel';
import Button from 'calcite-react/Button';
import Radio from 'calcite-react/Radio';
import { Fieldset, Legend } from 'calcite-react/Form';

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
    <Panel>
      <Fieldset
        style={{ textAlign: 'right', fontSize: '.8em' }}
        name={`set-operator-${props.id}`}
        horizontal
      >
        <Legend>Set Operator:</Legend>
        <Radio
          checked={props.mustMatchAll}
          onChange={() => updateSetOperator(true)}
        >
          AND
        </Radio>{' '}
        <Radio
          checked={!props.mustMatchAll}
          onChange={() => updateSetOperator(false)}
        >
          OR
        </Radio>
      </Fieldset>
      {getExpressions(props.expressions)}
      <SetPreviewer
        options={{
          mustMatchAll: props.mustMatchAll,
          expressions: props.expressions
        }}
      />
      <Button onClick={addExpression}>Add Expression</Button>
      <Button onClick={removeSet}>Remove Set</Button>
    </Panel>
  );
};

export default Set;
