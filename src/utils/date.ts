import { zeroConcat } from "./string";

export function formatDate(date) {
  const date_formated = date.substr(6, 4) + '-' + date.substr(3, 2) + '-' + date.substr(0, 2);
  return date_formated;
}

export function formatDateLocale(date: Date) {
  const _date = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  return formatDate(_date);
}

export function formatDateTimeLocale(date: Date) {
  const _date = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  return formatDateWithTime(_date);
}

export function stringToDate(dateString) {
  const dateStringDivided = dateString.split(":");
  const dateStringDate = new Date();
  dateStringDate.setHours(+dateStringDivided[0]);
  dateStringDate.setMinutes(+dateStringDivided[1]);
  return dateStringDate;
}

export function getToday({ withTime, formated }): Date | string {
  const date = new Date();
  const locale_date = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

  if (formated) {
    if (withTime) return formatDateWithTime(locale_date);

    return formatDate(locale_date);
  }

  if (withTime) return date;

  date.setHours(0);
  date.setMinutes(0);
  date.setMilliseconds(0);
  return date;
}

export function formatDateWithTime(date) {
  const date_formated = date.substr(6, 4) + '-' + date.substr(3, 2) + '-' + date.substr(0, 2) + date.substr(10, 19);
  return date_formated;
}

export function minute_convert(num: string) {
  const hours = parseInt(num.split(':')[0]) * 60;
  const minutes = parseInt(num.split(':')[1]);

  return hours + minutes;
}

export function minute_format(num: number) {

  const extraMinutes = num % 60;
  const hours = (num - extraMinutes) / 60;
  const roundedHours = Math.ceil(hours);
  const roundedMinutes = Math.ceil(extraMinutes);
  const formated = `${zeroConcat(roundedHours)}:${zeroConcat(roundedMinutes)}`
  return formated;

}

export function getDateDifference(dateStart, dateEnd) {

  const diffTime = Math.abs(dateEnd.getTime() - dateStart.getTime());
  const diffMinutes = Math.floor(diffTime / 1000 / 60);
  const diffSeconds = Math.ceil(diffTime / 1000);

  const formated = minute_format(diffMinutes);
  return {
    diffMinutes, diffSeconds, diffTime, formated
  }
}

export function getWeekDay(index: number): string {
  const week = {
    0: 'Dom',
    1: 'Seg',
    2: 'Ter',
    3: 'Qua',
    4: 'Qui',
    5: 'Sex',
    6: 'Sab',
    'undefined': 'anyday'
  }

  return week[index];
}

export function getBrlFormatedDateTime(date: Date) {
  if (!date) return 'Indefinido';
  const getDateMonth = zeroConcat(date.getMonth() + 1)
  const getHours = zeroConcat(date.getHours())
  const getMinutes = zeroConcat(date.getMinutes())
  const getDate = zeroConcat(date.getDate());

  return `${getDate}/${getDateMonth}/${date.getFullYear()} as ${getHours}:${getMinutes}`
}

export function getBrlFormatedDate(date: Date) {

  const getDateMonth = zeroConcat(date.getMonth() + 1)

  return `${date.getDate()}/${getDateMonth}`
}