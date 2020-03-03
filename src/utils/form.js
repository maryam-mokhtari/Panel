
export const isValid = (refs, inputname) => {
  let isValid = (
    inputname == 'selectPlan' && document.getElementsByName('selectPlan')
    && document.getElementsByName('selectPlan').length
      && Array.from(document.getElementsByName('selectPlan')).filter(item => item.checked).length
  )
  ||
  refs[inputname] &&
    (
      refs[inputname].type == 'radio'? refs[inputname].checked
        :
      (refs[inputname].value && refs[inputname].value != ''
      && (inputname != 'jsonInfo' && inputname != 'featureInfo' || isJson(refs[inputname].value))
      )
      ||
      (inputname == 'featureInfo' && (!refs[inputname].value || refs[inputname].value == ''))

    )
    // console.log('isValid', refs, inputname);
  if (isValid) {
    // console.log('isValid', refs[inputname]);
    if (refs[`${inputname}Div`]) {
      refs[`${inputname}Div`].classList.remove('has-error')
    }
    if (refs[`${inputname}ErrorIcon`]) {
      refs[`${inputname}ErrorIcon`].classList.add('hide')
    }
    return true
  } else {
    if (refs[`${inputname}Div`]) {
      refs[`${inputname}Div`].classList.add('has-error')
    }
    if (refs[`${inputname}ErrorIcon`]) {
      refs[`${inputname}ErrorIcon`].classList.remove('hide')
    }
    return false
  }
}

export const clear = (refs, inputname) => {
  if (refs[inputname]) {
    refs[inputname].value = ''
  }
}

export const clearFormGeneratorModal = () => {
  if (document.getElementsByClassName('input-form')) {
    Array.from(document.getElementsByClassName('input-form')).forEach(element => element.value = null)
  }
}

function isJson(str) {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}
