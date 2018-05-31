import { formatDate, getDayStart, getDayEnd } from './dateUtils';
import { getGenericFieldType } from './genericUtils';

export function buildExpression(options) {
  if (!options.field) return null;

  const fieldName = options.field.name;
  const fieldType = getGenericFieldType(options.field.type);
  const inputValue = options.value.code || '';
  const operator = options.operator;

  let value;
  if (!operator.omitValue) {
    value = `${operator.prefix || ''}${inputValue}${operator.suffix || ''}`;
  }

  let expression;
  switch (fieldType) {
    case 'string':
      expression = `${fieldName} ${operator.operator}`;
      expression += operator.omitValue ? '' : ` '${value}'`;
      break;
    case 'number':
      expression = `${fieldName} ${operator.operator}`;
      expression += operator.omitValue ? '' : ` ${value}`;
      break;
    case 'date':
      const d = new Date(inputValue);
      const date = new Date(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds()
      );
      if (operator.fullDay) {
        expression = `${fieldName} ${operator.operator}`;
        expression += ` timestamp ${getDayStart(
          date
        )} AND timestamp ${getDayEnd(date)}`;
      } else {
        expression = `${fieldName} ${operator.operator}`;
        expression += operator.omitValue
          ? ''
          : ` '${formatDate(date, 'date')}'`;
      }

      break;
    default:
  }

  return expression;
}

export function buildSet(options) {
  // options is an array of expressions and a boolean 'mustMatchAll'
  const { mustMatchAll, expressions } = options;
  const setOperator = mustMatchAll ? 'AND' : 'OR';

  const set = Object.keys(expressions)
    .map(key => {
      const expression = expressions[key];

      return `(${buildExpression(expression)})`;
    })
    .join(` ${setOperator} `);

  return set;
}

export function buildFilter(options) {
  // options is an array of sets and a boolean 'mustMatchAll'
  const { mustMatchAll, sets } = options;
  const filterOperator = mustMatchAll ? 'AND' : 'OR';

  const filter = Object.keys(sets)
    .map(key => {
      const set = sets[key];

      return `(${buildSet(set)})`;
    })
    .join(` ${filterOperator} `);

  return filter;
}
