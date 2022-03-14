const locale = "pt-br";

const onlyDateoptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
};

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  ...onlyDateoptions,
  hour: "2-digit",
  minute: "2-digit",
};

const formatDateToString = (dateToFormat: Date) => {
  return dateToFormat.toLocaleDateString(locale, onlyDateoptions);
};

const formatDateTimeToString = (dateToFormat: Date) => {
  return dateToFormat.toLocaleDateString(locale, dateTimeOptions);
};

const DateUtils = {
  formatDateToString,
  formatDateTimeToString,
};

export default DateUtils;