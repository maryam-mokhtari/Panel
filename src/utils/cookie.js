export const setCookie = (tokenName, tokenValue, daysofValid, ) => {
  const domainArray = location.hostname.split('.')
  const domain =  domainArray.slice(domainArray.length - 2, domainArray.length).join('.')
  const expireDate = new Date(new Date().setTime(new Date().getTime() + (daysofValid || 5)*24*60*60*1000))
  document.cookie = `${tokenName}="${tokenValue}"; Domain=.${domain};expires=${daysofValid && daysofValid <= 0? new Date(0): expireDate};path=/`
}
