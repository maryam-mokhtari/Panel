import ActionTypes from '../actions/ActionTypes'
import {getCount, getNewStateOnFailure} from '../utils/entities'
// import { language, ln, dir } from '../utils/language'

export default generalEntities = (state = {}, action) => {
  let messageText = ''
  let messageType = ''
  console.log('ActionType:', action.type);
  switch (action.type) {

    case ActionTypes.CURRENTUSER_REQUEST:
      return {...state, userDataLoading: true,}
    case ActionTypes.CURRENTUSER_SUCCESS:
      const language = action.payload && action.payload.language && action.payload.language.code == 'en'? 'en': 'fa'
      let shouldBeReloaded = false
      if (localStorage.getItem('language') && localStorage.getItem('language') != language) {
        shouldBeReloaded = true
      }
      localStorage.setItem('language', language)
      if (shouldBeReloaded) {
        location.reload()        
      }
      return { ...state, userData: action.payload, userDataLoading: false,
        language,
      }

    case ActionTypes.CHANGELANG_REQUEST:
      return {...state, changeLanguageLoading: true}
    case ActionTypes.CHANGELANG_SUCCESS:
      return {...state, changeLanguageLoading: false, language: action.meta==2?'en':'fa'}
    case ActionTypes.CHANGELANG_FAILURE:
      return {...state, changeLanguageLoading: false, }
    case ActionTypes.CURRENTUSER_FAILURE:
      const {newState, errorMessage} = getNewStateOnFailure(state, action.payload)
      return {...newState, messageText: errorMessage, messageType: 'error',
        userDataLoading: false, }
     // case 'SHOW_MESSAGE':
     //   console.log('SHOW_MESSAGE', { ...state, messageText: action.messageText, messageType: action.messageType});
     //   return { ...state, messageText: action.messageText, messageType: action.messageType}
    default:
      return state
  }
}
