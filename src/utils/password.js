function scorePassword(pass) {
  let score = 0

  if (!pass)
    return score

  // award every unique letter until 5 repetitions
  var letters = new Object()
  for (let i = 0, len = pass.length; i < len; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  let variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  let variationCount = 0
  for (let check in variations) {
    variationCount += (variations[check] == true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score) <= 100 ? parseInt(score) : 100
}
const assignToPasswordStrength = (strength, labels) => {
  if (strength <= 25) return labels[0]
  else if (strength > 25 && strength <= 50) return labels[1]
  else if (strength > 50 && strength <= 75) return labels[2]
  else if (strength > 75) return labels[3]
}
export const isPasswordStrong = password => {
  if (scorePassword(password) > 50) {
    return true
  }
  return false
}
