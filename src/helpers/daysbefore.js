const is_days_before = (days) => {
  const cur_date = new Date();
  const prev_date = new Date() - days * 24 * 60 * 60;

  if (prev_date > cur_date) {
  }
};
