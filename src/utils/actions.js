
export const createConstants = (...constants) => {
  return constants.reduce((acc, constant) => {
    acc[constant + '_REQUEST'] = constant + '_REQUEST';
    acc[constant + '_SUCCESS'] = constant + '_SUCCESS';
    acc[constant + '_FAILURE'] = constant + '_FAILURE';
    return acc
  }, {});
}

export const createGeneralConstants = (...constants) => {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant
    return acc
  }, {})
}
