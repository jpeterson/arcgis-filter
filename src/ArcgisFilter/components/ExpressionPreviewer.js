import React from 'react';

import { buildExpression } from '../utils/sqlUtils';

const ExpressionPreviewer = props => {
  const sql = options => {
    return buildExpression(options);
  };

  return (
    <div>
      <div>Field Type: {props.options.field.type}</div>
      <pre style={{ whiteSpace: 'pre-line' }}>{sql(props.options)}</pre>
    </div>
  );
};

export default ExpressionPreviewer;
