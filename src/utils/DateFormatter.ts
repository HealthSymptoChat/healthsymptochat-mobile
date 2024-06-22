export const FormatDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getFullYear()}`;
};

export const FormatDateTime = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export const ExtractTime = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export const FormatDateWithoutYear = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}-${dateObj.getMonth() + 1}`;
};
