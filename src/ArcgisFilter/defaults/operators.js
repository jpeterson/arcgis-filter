export default {
  string: [
    {
      alias: 'is',
      operator: '='
    },
    {
      alias: 'is not',
      operator: '<>'
    },
    {
      alias: 'starts with',
      operator: 'LIKE',
      suffix: '%'
    },
    {
      alias: 'ends with',
      operator: 'LIKE',
      prefix: '%'
    },
    {
      alias: 'contains',
      operator: 'LIKE',
      prefix: '%',
      suffix: '%'
    },
    {
      alias: 'does not contain',
      operator: 'NOT LIKE',
      prefix: '%',
      suffix: '%'
    },
    {
      alias: 'is blank',
      operator: 'IS NULL',
      omitValue: true
    },
    {
      alias: 'is not blank',
      operator: 'IS NOT NULL',
      omitValue: true
    }
  ],
  number: [
    {
      alias: 'is',
      operator: '='
    },
    {
      alias: 'is not',
      operator: '<>'
    },
    {
      alias: 'is at least',
      operator: '>='
    },
    {
      alias: 'is less than',
      operator: '<'
    },
    {
      alias: 'is at most',
      operator: '<='
    },
    {
      alias: 'is greater than',
      operator: '>'
    },
    {
      alias: 'is blank',
      operator: 'IS NULL',
      omitValue: true
    },
    {
      alias: 'is not blank',
      operator: 'IS NOT NULL',
      omitValue: true
    }
  ],
  date: [
    {
      alias: 'is on',
      fullDay: true,
      operator: 'BETWEEN'
    },
    {
      alias: 'is not on',
      fullDay: true,
      operator: 'NOT BETWEEN'
    },
    {
      alias: 'is before',
      operator: '<'
    },
    {
      alias: 'is after',
      operator: '>'
    },
    {
      alias: 'is on or before',
      operator: '<='
    },
    {
      alias: 'is on or after',
      operator: '>='
    },
    {
      alias: 'is blank',
      operator: 'IS NULL',
      omitValue: true
    },
    {
      alias: 'is not blank',
      operator: 'IS NOT NULL',
      omitValue: true
    },
    {
      alias: 'in the last',
      operator: '?',
      relativeDate: true
    },
    {
      alias: 'not in the last',
      operator: '?',
      relativeDate: true
    }
  ],
  epoch: [
    {
      alias: 'is on',
      fullDay: true,
      operator: 'BETWEEN'
    },
    {
      alias: 'is not on',
      fullDay: true,
      operator: 'NOT BETWEEN'
    },
    {
      alias: 'is before',
      operator: '<'
    },
    {
      alias: 'is after',
      operator: '>'
    },
    {
      alias: 'is on or before',
      operator: '<='
    },
    {
      alias: 'is on or after',
      operator: '>='
    },
    {
      alias: 'is blank',
      operator: 'IS NULL',
      omitValue: true
    },
    {
      alias: 'is not blank',
      operator: 'IS NOT NULL',
      omitValue: true
    },
    {
      alias: 'in the last',
      operator: '?',
      relativeDate: true
    },
    {
      alias: 'not in the last',
      operator: '?',
      relativeDate: true
    }
  ]
};
