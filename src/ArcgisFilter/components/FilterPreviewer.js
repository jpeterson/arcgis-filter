import React from 'react';

import { buildFilter } from '../utils/sqlUtils';

const FilterPreviewer = props => {
  const sql = options => {
    return buildFilter(options);
  };

  return (
    <div>
      <pre style={{ whiteSpace: 'pre-line' }}>{sql(props.options)}</pre>
    </div>
  );
};

export default FilterPreviewer;
