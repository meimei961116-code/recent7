// tests.js：依照 rules.md 的規則逐一檢查最近 7 天的計算。

addCase({
  name: '規則 1：今天的紀錄包含在範圍內',
  today: '2026-01-01',
  records: [
    { log_date: '2026-01-01', minutes: 30 }
  ],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 1：往前第 6 天的紀錄包含在範圍內',
  today: '2026-01-01',
  records: [
    { log_date: '2025-12-26', minutes: 20 }
  ],
  expect: { minutes: 20, count: 1 }
});

addCase({
  name: '規則 2：早於範圍或晚於今天的紀錄不計算',
  today: '2026-01-01',
  records: [
    { log_date: '2025-12-25', minutes: 40 },
    { log_date: '2026-01-02', minutes: 50 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 3：符合日期的每筆紀錄各自計數並加總分鐘數',
  today: '2026-01-01',
  records: [
    { log_date: '2025-12-30', minutes: 15 },
    { log_date: '2025-12-30', minutes: 25 },
    { log_date: '2026-01-01', minutes: 10 }
  ],
  expect: { minutes: 50, count: 3 }
});

addCase({
  name: '規則 4：null 分鐘數仍計一筆但作為 0，缺少 minutes 欄位的紀錄不計算',
  today: '2026-01-01',
  records: [
    { log_date: '2026-01-01', minutes: null },
    { log_date: '2025-12-31' },
    { log_date: '2025-12-30', minutes: 25 }
  ],
  expect: { minutes: 25, count: 2 }
});

addCase({
  name: '規則 5：同一天有多筆紀錄時 days 只加一天',
  today: '2026-01-01',
  records: [
    { log_date: '2026-01-01', minutes: 10 },
    { log_date: '2026-01-01', minutes: 20 },
    { log_date: '2025-12-31', minutes: 30 }
  ],
  expect: { minutes: 60, count: 3, days: 2 }
});

addCase({
  name: '規則 5：null 分鐘數的紀錄算一天，缺少 minutes 或日期超出範圍不增加 days',
  today: '2026-01-01',
  records: [
    { log_date: '2026-01-01', minutes: null },
    { log_date: '2025-12-31' },
    { log_date: '2026-01-02', minutes: 45 }
  ],
  expect: { minutes: 0, count: 1, days: 1 }
});
