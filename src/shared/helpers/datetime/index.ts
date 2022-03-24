export function getOneHourLaterDate(date: Date = new Date()) {
  const dateHourLater = new Date(date);
  dateHourLater.setTime(dateHourLater.getTime() + 3_600_000);
  return dateHourLater;
}
