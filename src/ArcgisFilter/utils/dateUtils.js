import moment from 'moment';

export function getDayStart(date) {
  const dayStart = formatDate(
    moment(date)
      .startOf('day')
      .toDate(),
    'datetime'
  );
  return dayStart;
}

export function getDayEnd(date) {
  const dayEnd = formatDate(
    moment(date)
      .endOf('day')
      .toDate(),
    'datetime'
  );
  return dayEnd;
}

export function getEpochDayStart(date) {
  const dayStart = formatDate(
    moment(date)
      .startOf('day')
      .toDate(),
    'epoch'
  );
  return dayStart;
}

export function getEpochDayEnd(date) {
  const dayEnd = formatDate(
    moment(date)
      .endOf('day')
      .toDate(),
    'epoch'
  );
  return dayEnd;
}

export function formatDate(date, formatter) {
  const dateFormat = 'YYYY-MM-DD';
  const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
  const epochFormat = 'x';

  switch (formatter) {
    case 'date':
      return moment(date).format(dateFormat);
    case 'datetime':
      return moment(date).format(dateTimeFormat);
    case 'epoch':
      return moment(date).format(epochFormat);
    default:
      return moment(date).format(dateTimeFormat);
  }
}
