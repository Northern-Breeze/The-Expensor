const makeWeek = () => {
  let week = [];
  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (days[date.getDay()] === 'Thu') {
    week = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  }
  if (days[date.getDay()] === 'Fri') {
    week = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  }
  if (days[date.getDay()] === 'Sat') {
    week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  if (days[date.getDay()] === 'Sun') {
    week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
  if (days[date.getDay()] === 'Mon') {
    week = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
  }
  if (days[date.getDay()] === 'Tue') {
    week = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
  }
  if (days[date.getDay()] === 'Wen') {
    week = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
  }
  return week;
};

export default makeWeek;
