import {language, ln, dir} from './language'

export const getNormalizedDigit = (digit, isChangeToRial) => {
  const PUJITORIAL = 10000
  digit = isChangeToRial? digit * PUJITORIAL: digit
  return Math.round(digit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getNormalizedObject = (obj) => {
  return Object.keys(obj)
  .filter(key => typeof(obj[key]) != 'object')
  .reduce((newObj, key) => {
    newObj[key] = obj[key];
    return newObj;
  }, {})
}

export const getNormedBytes = (value, isNormed = true) => {
  console.log('getNormedBytes', value, isNormed);
  if (value != null && isNormed) {
    if (value >= 1024 * 1024 * 1024 * 1024) return Math.round(value / (1024 * 1024 * 1024 * 1024)) + ' ' + ln('tb')
    if (value >= 1024 * 1024 * 1024) return Math.round(value / (1024 * 1024 * 1024)) + ' ' + ln('gb')
    if (value >= 1024 * 1024) return Math.round(value / (1024 * 1024)) + ' ' + ln('mb')
    if (value >= 1024) return Math.round(value / 1024) + ' ' + ln('kb')
    return value + ' ' + ln('b')
  }
  return value
}
