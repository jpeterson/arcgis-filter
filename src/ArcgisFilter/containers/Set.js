import React from 'react';

import Expression from './Expression';

import Panel from 'calcite-react/Panel';
import Button, { ButtonGroup } from 'calcite-react/Button';
import { FormControl, FormControlLabel } from 'calcite-react/Form';
import Tooltip from 'calcite-react/Tooltip';
import PlusIcon from '../icons/PlusIcon';

import { StyledSetHeaderRow, StyledAddSetButton } from './Set-styled';
import CalciteTheme from 'calcite-react/theme/CalciteTheme';

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
          disableUnique={props.disableUnique}
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
      <StyledSetHeaderRow>
        <FormControl horizontal style={{ marginBottom: '5px' }}>
          <FormControlLabel style={{ marginRight: '10px' }}>
            Set Operator:
          </FormControlLabel>
          <ButtonGroup>
            <Tooltip title="All Expressions Match" enterDelay={400}>
              <Button
                extraSmall
                clear={!props.mustMatchAll}
                onClick={() => updateSetOperator(true)}
              >
                AND
              </Button>
            </Tooltip>
            <Tooltip title="Any Expressions Match" enterDelay={400}>
              <Button
                extraSmall
                clear={props.mustMatchAll}
                onClick={() => updateSetOperator(false)}
              >
                OR
              </Button>
            </Tooltip>
          </ButtonGroup>
        </FormControl>
        <FormControl horizontal style={{ margin: 0 }}>
          <Button extraSmall onClick={removeSet}>
            Remove Set
          </Button>
        </FormControl>
      </StyledSetHeaderRow>
      {getExpressions(props.expressions)}
      <StyledAddSetButton onClick={addExpression}>
        <PlusIcon fill={CalciteTheme.palette.gray} /> Add Expression
      </StyledAddSetButton>
    </Panel>
  );
};

export default Set;
