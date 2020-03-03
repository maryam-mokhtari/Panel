
export const getOsName = (os) => {
  let osName = os
  osName = osName.replace('deb', 'Debian')
  osName = osName.replace('rhel', 'CentOs')
  osName = osName[0].toString().toUpperCase() + osName.substr(1)
  return osName
}
