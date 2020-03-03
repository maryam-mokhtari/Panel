
export const buildMessage = (messageType, messageText) => {
  const color = messageType == 'success'? 'green': messageType == 'error'? 'red': 'orange'
  if (messageText && messageText != '') {
    return {
      messageText,
      messageType,
      color,
    }
  }
  return null
}
