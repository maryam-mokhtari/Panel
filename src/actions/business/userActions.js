import { fetch, loadInfo } from '../dynamicAction'
import {loadGroupUsers} from './usersActions'
import {listConstants} from '../../utils/list'
import {loadCurrentUser} from '../master/userActions'

const {pageNumber, pageSize, sortColumn, isAscending, } = listConstants

export const resendInvitation = (id, lang) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers/${id}/resendEmail?lang=${lang}`, 'B_RESEND', 'GET', null, id))
  }
}

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers?ids=${id}`, 'B_DELETEUSER', 'DELETE', null, id))
    .then(() => dispatch(loadGroupUsers(pageNumber, pageSize, sortColumn, isAscending, )))
  }
}

export const loginAsClient = (username) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/users/loginAsClient?username=${username}`, 'B_LOGINASCLIENT', 'PUT', null, username))
  }
}

export const changeUserQuota = (userId, quota) => {
  quota = Math.round(quota * 1024 * 1024 * 1024)
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers/changePlan?userId=${userId}&quota=${quota}`, 'B_CHANGEQUOTA', 'PUT', null, userId))
    .then(() => dispatch(loadGroupUsers(pageNumber, pageSize, sortColumn, isAscending, )))
    .then(() => dispatch(loadCurrentUser()))
  }
}

export const activateUser = (userId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers/enableUser?userId=${userId}`, 'B_ACTIVATE', 'PUT', null, userId))
    .then(() => dispatch(loadGroupUsers(pageNumber, pageSize, sortColumn, isAscending, )))
  }
}

export const deactivateUser = (userId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers/disableUser?userId=${userId}`, 'B_DEACTIVATE', 'PUT', null, userId))
    .then(() => dispatch(loadGroupUsers(pageNumber, pageSize, sortColumn, isAscending, )))
  }
}
