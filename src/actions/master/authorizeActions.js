import { fetch, loadInfo } from '../dynamicAction'

export const authorizeSystem = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/admin/getAuthorizationStatus', 'SYSTEMAUTH'))
  }
}

export const enableAuthorization = () => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/enableAuthorization`, 'SYSTEMAUTHENABLE', 'PUT'))
  }
}

export const disableAuthorization = () => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/disableAuthorization`, 'SYSTEMAUTHDISABLE', 'PUT'))
  }
}

export const loadUserAuthorization = (userId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/${userId}/getUserAuthorizationStatus`, 'USERAUTH'))
  }
}

export const enableUserAuthorization = (userId) => {
  console.log('userId from enableUserAuthorization : ', userId)
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/${userId}/authorizeUser`, 'USERAUTHENABLE', 'PUT'))
  }
}

export const disableUserAuthorization = (userId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/${userId}/unAuthorizeUser`, 'USERAUTHDISABLE', 'PUT'))
  }
}

export const getAuthorizationDocuments = (userId) => {
  return (dispatch) => {
    return dispatch(fetch(`/cfs/rest/admin/${userId}/authDocument`, 'GETDOCS'))
  }
}

export const authDocStatus = (userId) => {
  return (dispatch) => {
    return dispatch(fetch(`/cfs/rest/admin/${userId}/authDocStatus`, 'GETDOCSTATUS'))
  }
}

export const setAuthDocStatus = (status, userId, description) => {
  console.log('setAuthDocStatus', status, userId, description);
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/setAuthDocStatus`, 'SETDOCSTATUS', 'PUT', {
      user: {id: userId},
      status,
      description,
    }, null, {status, description},))
  }
}
