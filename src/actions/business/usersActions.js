import { fetch, loadInfo } from '../dynamicAction'
import {listConstants} from '../../utils/list'

const {pageNumber, pageSize, sortColumn, isAscending, } = listConstants

export const inviteUsers = (emails, quota, lang) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers/sendBatchInvitation?language=${lang}`, 'B_NEWUSER', 'POST',
      {
        planId: quota, // quota of invited user(s)
        // defaultQuota: quota,
        emails,
      },
    ))
  }
}

export const loadGroupUsers = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams) => {
  let endpoint = `/cfs/rest/planGroupUsers?sort=${isAscending?'+':'-'}${sortColumn}`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'B_USERS')
}

export const addAdminToGroup = (groupId, quota) => {
  quota = Math.round(quota * 1024 * 1024 * 1024)
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers/addAdminToGroupUser?groupId=${groupId}&quota=${quota}`,
      'B_ADDADMINTOGROUP', 'PUT'
    ))
    .then(() => dispatch(loadGroupUsers(pageNumber, pageSize, sortColumn, isAscending, )))
    .then(() => dispatch(fetch(`/cfs/rest/users/currentUser`, 'CURRENTUSER')))
  }
}

export const hasGroupAdmin = (userId) => {
  // let endpoint = `/cfs/rest/planGroupUsers?sort=${isAscending?'+':'-'}${sortColumn}`
  // return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, [{type: 'user.id', value: userId}], 'B_ISADMININGROUP')
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroupUsers?where=%7B%22user.id%22:%7B%22$eq%22:${userId}%7D%7D`, 'B_ISADMININGROUP'))
  }
}

export const getGroupUsersCount = () => {
  const pageSize1 = 1
  let endpoint = `/cfs/rest/planGroupUsers?sort=${isAscending?'+':'-'}${sortColumn}`
  return loadInfo(pageNumber, pageSize1, sortColumn, isAscending, endpoint, null, 'B_USERSCOUNT')
}
