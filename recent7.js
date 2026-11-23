function recent7(records, today) {
  var start = new Date(today + 'T00:00:00.000Z');
  start.setUTCDate(start.getUTCDate() - 6);
  var firstDay = start.toISOString().slice(0, 10);

  var minutes = 0;
  var count = 0;
  var days = 0;
  var countedDates = Object.create(null);

  records.forEach(function (record) {
    if (record.log_date === undefined || record.log_date < firstDay || record.log_date > today) return;
    if (record.minutes === undefined) return;

    count += 1;
    if (record.minutes !== null) minutes += record.minutes;

    if (!countedDates[record.log_date]) {
      countedDates[record.log_date] = true;
      days += 1;
    }
  });

  return { minutes: minutes, count: count, days: days };
}
