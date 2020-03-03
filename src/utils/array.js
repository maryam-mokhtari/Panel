export const isArrayOK = (array) => {
  return array && Array.isArray(array) && !!array.length
}

export default strintToIntegerFunc = (str) => {
  switch (str) {
    case 'طرح ۱':
      return 1;
    case 'طرح ۲':
      return 2;
    case 'طرح ۳':
      return 3;
    case 'طرح ۴':
      return 4;
    case 'طرح ۵':
      return 5;
    case 'طرح ۶':
      return 6;
    case 'طرح ۷':
      return 7;
    case 'طرح ۸':
      return 8;
    case 'طرح ۹':
      return 9;
  }
}