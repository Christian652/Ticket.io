export function zeroConcat(dateNumber) { return dateNumber < 10 ? '0' + dateNumber : dateNumber}

export function removeWhiteSpaces(string) {
  const divided = string.split('  ');
  const withOnlyOneSpace = divided.map(item => item.trim())
  
  return withOnlyOneSpace.join(" "); 
}