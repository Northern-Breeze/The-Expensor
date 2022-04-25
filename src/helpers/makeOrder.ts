const makeOrder = () => {
  let week: {Fri: number, Sat: number, Sun: number, Mon: number, Tue: number, Wed: number, Thu: number} | undefined;
  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (days[date.getDay()] === 'Thu') {
    week = {Fri: 0, Sat: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0};
  }
  if (days[date.getDay()] === 'Fri') {
    week = {Sat: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0};
  }
  if (days[date.getDay()] === 'Sat') {
    week = {Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0};
  }
  if (days[date.getDay()] === 'Sun') {
    week = {Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0};
  }
  if (days[date.getDay()] === 'Mon') {
    week = {Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0, Mon: 0};
  }
  if (days[date.getDay()] === 'Tue') {
    week = {Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0, Mon: 0, Tue: 0};
  }
  if (days[date.getDay()] === 'Wed') {
    week = {Thu: 0, Fri: 0, Sat: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0};
  }
  return week;
};

export default makeOrder;
