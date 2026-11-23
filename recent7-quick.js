// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  const end = new Date(`${today}T00:00:00Z`);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);

  const firstDay = start.toISOString().slice(0, 10);
  let minutes = 0;
  let count = 0;

  for (const record of records) {
    if (record.log_date >= firstDay && record.log_date <= today) {
      count += 1;
      if (typeof record.minutes === 'number') minutes += record.minutes;
    }
  }

  return { minutes, count };
}
