import format from 'date-fns/format';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';

export function getDayStart(date) {
  //2018-05-31 05:59:59
  const dayStart = formatDate(startOfDay(date, 'datetime'));
  return dayStart;
}

export function getDayEnd(date) {
  const dayEnd = formatDate(endOfDay(date, 'datetime'));
  return dayEnd;
}

export function formatDate(date, formatter) {
  const dateFormat = 'YYYY-MM-DD';
  const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

  const formatString = formatter === 'date' ? dateFormat : dateTimeFormat;

  return format(date, formatString);
}
