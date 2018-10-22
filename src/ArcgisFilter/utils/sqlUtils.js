import {
  formatDate,
  getDayStart,
  getDayEnd,
  getEpochDayStart,
  getEpochDayEnd
} from './dateUtils';
import { getGenericFieldType } from './genericUtils';

export function buildExpression(options) {
  if (!options || !options.field) return null;

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
        expression += ` timestamp '${getDayStart(
          date
        )}' AND timestamp '${getDayEnd(date)}'`;
      } else {
        expression = `${fieldName} ${operator.operator}`;
        expression += operator.omitValue
          ? ''
          : ` '${formatDate(date, 'date')}'`;
      }
      break;
    case 'epoch':
      const epochD = new Date(inputValue);
      const epochDate = new Date(
        epochD.getUTCFullYear(),
        epochD.getUTCMonth(),
        epochD.getUTCDate(),
        epochD.getUTCHours(),
        epochD.getUTCMinutes(),
        epochD.getUTCSeconds()
      );
      if (operator.fullDay) {
        expression = `${fieldName} ${operator.operator}`;
        expression += ` ${getEpochDayStart(epochDate)} AND ${getEpochDayEnd(
          epochDate
        )}`;
      } else {
        expression = `${fieldName} ${operator.operator}`;
        expression += operator.omitValue
          ? ''
          : ` '${formatDate(epochDate, 'epoch')}'`;
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
      const expression = buildExpression(expressions[key]);

      if (!expression) return null;

      return `(${expression})`;
    })
    .filter(expression => expression);

  if (set.length) {
    return set.join(` ${setOperator} `);
  }

  return '';
}

export function buildFilter(options) {
  // options is an array of sets and a boolean 'mustMatchAll'
  const { mustMatchAll, sets } = options;
  const filterOperator = mustMatchAll ? 'AND' : 'OR';

  const filter = Object.keys(sets)
    .map(key => {
      const set = buildSet(sets[key]);

      if (!set) return null;

      if (Object.keys(sets).length <= 1) {
        return set;
      }

      return `(${set})`;
    })
    .filter(set => set);

  if (filter.length) {
    return filter.join(` ${filterOperator} `);
  }

  return '';
}
