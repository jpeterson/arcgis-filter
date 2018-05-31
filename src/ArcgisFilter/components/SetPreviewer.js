import React from 'react';

import { buildSet } from '../utils/sqlUtils';

const SetPreviewer = props => {
  const sql = options => {
    return buildSet(options);
  };

  return (
    <div>
      <pre style={{ whiteSpace: 'pre-line' }}>{sql(props.options)}</pre>
    </div>
  );
};

export default SetPreviewer;
