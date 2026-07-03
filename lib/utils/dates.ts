const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function dayLabelFromOffset(offset: number): { day: string; date: string } {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return {
    day: offset === 0 ? "Today" : DAY_NAMES[d.getDay()],
    date: `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`,
  };
}

export function formatSlot(slot: string): string {
  const [hStr, m] = slot.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${period}`;
}

export function fullDateLabel(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

export function isoDateFromOffset(offset: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export function fullDateLabelFromISO(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}
