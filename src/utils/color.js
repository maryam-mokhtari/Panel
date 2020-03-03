
export const percentColor = (used, total) => {
  // if (used && total) {
  percent = Math.round((used / total) * 100)
  // }
  if (percent >= 0 && percent < 20) {
    return 'blue'
  } else if (percent >= 20 && percent < 40) {
    return 'aqua'
  } else if (percent >= 40 && percent < 60) {
    return 'green'
  } else if (percent >= 60 && percent < 80) {
    return 'yellow'
  } else if (percent >= 80 && percent < 100) {
    return 'red'
  }
  return 'gray'
}

export const changeBaseColor = (newColor) => {
  const newSkinClass = `skin-${newColor}`
  const bodyClasses = document.getElementsByTagName('body')[0].classList
  const oldSkinClass = Array.from(bodyClasses).filter(item => item.includes('skin'))[0]
  console.log('changeBaseColor', newSkinClass, oldSkinClass, bodyClasses);
  bodyClasses.remove(oldSkinClass)
  bodyClasses.add(newSkinClass)
}

export const getPeriodColor = (recurringPeriod) => {
  switch (recurringPeriod) {
    case 'DAY':
      return 'aqua'
    case 'MONTH':
      return 'blue'
    case 'TMONTH':
      return 'teal'
    case 'SMONTH':
      return 'olive'
    case 'NMONTH':
      return 'light-blue'
    case 'YEAR':
      return 'green'
    default:
      return 'grey'
  }
}
export const getCategoryColor = (category) => {
  switch (category) {
    case 'CWS':
      return 'blue'
    case 'CWS_HOST':
      return 'aqua'
    case 'CFS':
      return 'green'
    case 'CDN':
      return 'yellow'
    case 'HOST':
      return 'orange'
    case 'CFS_BUSINESS':
      return 'teal'
    case 'ALL':
      return 'purple'
    case 'DLC':
      return 'red'
    case 'DOMAIN':
      return 'olive'
    default:
      return 'grey'

  }
}
