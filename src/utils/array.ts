import { minute_convert } from "./date";

export function arraySum(array: any[]) {
  if (array == undefined || array.length == 0) return 0;
  return array.reduce((acc, item) => acc + item);
}

export function arrayMax(array: any[]) {
  return Math.max(...array)
}

export function arrayAvg(array: any[]) {
  const sum = arraySum(array);
  const avg = sum / array.length;
  return avg;
}

export function getBiggerItem(array: any[] | Set<any>) {
  if (!array[0]) return 0;
  let theBigger = array[0];

  array.forEach(item => item > theBigger ? theBigger = item : theBigger = theBigger)
  return theBigger;
}

export function getSmallerItem(array) {
  if (!array[0]) return 0;
  const typeOf = typeof array;
  let theSmaller = typeOf == "object" ? array[array.length-1] : array[array.size];
  
  array.forEach(item => item < theSmaller ? theSmaller = item : theSmaller = theSmaller)
  return theSmaller;
}

export function getBiggerDate(array: any[] & Set<any>) {
  let biggerDate = array[0];

  array.forEach(date => {
    const dateMinutes = minute_convert(`${date.getHours()}:${date.getMinutes()}`);
    const biggerDateMinutes = minute_convert(`${date.getHours()}:${date.getMinutes()}`);

    if (dateMinutes > biggerDateMinutes) biggerDate = date;
  })

  return biggerDate;
}
