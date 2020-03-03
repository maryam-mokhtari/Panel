import React from 'react'

// Component to create a grid of cells each containing a character of a number or string
const Grid = props => {
  const {value = '', fa = true, fixedNumber, isPreInvoice} = props

  // number|string ==> string
  let result = String(value)

  // Requires empty left padding to the result
  if (fixedNumber && (result.length < fixedNumber)) {
    const diff = fixedNumber - result.length

    // Left padd empty character to the result equal to diff value
    for (let i = 0; i < diff; i++) {
       result = ' ' + result
    }
  }
console.log('Grid', props);
  return (
    <span className="grid">
      {
        result.split('').map((char, index) => {
          return (
            <span key={index} className={isPreInvoice?'cell':''}>{ char }</span>
          )
        })
      }
    </span>
  )
}

export default Grid
