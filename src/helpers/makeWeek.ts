const makeWeek = () => {
  const date = new Date();
  const currentDay = date.getDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days.slice(currentDay).concat(days.slice(0, currentDay));
};

export default makeWeek;

