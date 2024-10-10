/**
 * Returns an object representing the number of transactions for each day of the week,
 * starting from the current day and going back to the previous week. Each day of the
 * week is represented by a key-value pair, where the key is the day of the week (e.g.
 * 'Mon', 'Tue', etc.) and the value is the number of transactions for that day.
 *
 * @return {Record<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun', number>}
 * An object representing the number of transactions for each day of the week.
 */
const makeOrder = (): Record<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun', number> => {
  const week: Record<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun', number> = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentDayIndex = date.getDay();
  const startDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  for (let i = startDayIndex; i < days.length; i++) {
    week[days[i] as keyof typeof week] = i - startDayIndex + 1;
  }
  for (let i = 0; i < startDayIndex; i++) {
    week[days[i] as keyof typeof week] = days.length - (startDayIndex - i);
  }

  return week;
};

export default makeOrder;


