import { fetch, loadInfo } from '../dynamicAction'

export const changeLanguage = (userId, languageId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/users/${userId}/language/${languageId}`, 'CHANGELANG', 'PUT', null, languageId))
  }
}
