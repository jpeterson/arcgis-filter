import format from 'date-fns/format';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';

export function getDayStart(date) {
  const dayStart = formatDate(startOfDay(date), 'datetime');
  return dayStart;
}

export function getDayEnd(date) {
  const dayEnd = formatDate(endOfDay(date), 'datetime');
  return dayEnd;
}

export function getEpochDayStart(date) {
  const dayStart = formatDate(startOfDay(date), 'epoch');
  return dayStart;
}

export function getEpochDayEnd(date) {
  const dayEnd = formatDate(endOfDay(date), 'epoch');
  return dayEnd;
}

export function formatDate(date, formatter) {
  const dateFormat = 'YYYY-MM-DD';
  const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
  const epochFormat = 'x';

  switch (formatter) {
    case 'date':
      return format(date, dateFormat);
    case 'datetime':
      return format(date, dateTimeFormat);
    case 'epoch':
      return format(date, epochFormat);
    default:
      return format(date, dateTimeFormat);
  }
}
