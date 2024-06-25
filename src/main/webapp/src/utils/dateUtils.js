// utils/dateUtils.js

// utils/dateUtils.js

export const formatDate = (date) => {
  const options = { month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-US", options).replace("/", "/");
};

export const getWeeklyPeriods = (startDate) => {
  const periods = [];
  const start = new Date(startDate);
  for (let i = 0; i < 12; i++) {
    const weekStart = new Date(start);
    weekStart.setDate(start.getDate() + i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    periods.push({
      week: i + 1,
      start: weekStart,
      end: weekEnd,
    });
  }
  return periods;
};

export const stripTime = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
