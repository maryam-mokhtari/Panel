
export const extractEmails = (emailsTxt) => {
  if (!emailsTxt) return
  const matchedEmails = emailsTxt.match(/[^(,|\n)]+/gi)

  if (matchedEmails) return (
    matchedEmails
      .map(item => {
        item = item.trim()
        if (Number(item)) {
          return item * 1024 * 1024 * 1024
        }
        return item
      })
      .join(',')
  )

  return null
}
