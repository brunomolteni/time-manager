// Returns a range object with the end date being today and the start being a certain amount of days before today.

export default (daysBefore) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const end = new Date().toISOString();
  const start = new Date(
    new Date().getTime() - oneDay * daysBefore
  ).toISOString();

  return { start, end };
};
