import {fetch, loadInfo} from '../dynamicAction'

export const loadGroups = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams) => {
  let endpoint = `/cfs/rest/admin/planGroups?sort=${isAscending?'+':'-'}${sortColumn}`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'GROUPS')
}



export const addGroup = (groupName, memberCount, userId, planId) => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/planGroups', 'ADDGROUP', 'POST',
      {
        groupName,
        memberCount,
        adminUser: {id: userId},
        plan: {id: planId},
      }
    ))
  }
}

export const upgradeGroup = (groupId, planId, recurringPeriod) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/${groupId}/upgradePlan?planId=${planId}&recurringPeriod=${recurringPeriod}`, 'UPGRADEGROUP', 'PUT',
    {
      plan: {id: planId},
      recurringPeriod
    }))
  }
}

export const loadGroupUser = (user) => {
  let endpoint = `/cfs/rest/admin/adminUser/users?where=%5B%7B%22email%22:%7B%22$eq%22:${user}%7D%7D,%7B%22username%22:%7B%22$eq%22:${user}%7D%7D%5D&match=OR`
  return (dispatch, getState) => {
    return dispatch(fetch(endpoint, 'USER'))
  }
}

export const loadGroupPlan = (planName) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/products?where=%7B%22name%22:%7B%22$eq%22:${planName}%7D%7D`, 'PRODUCT'))
  }
}

export const loadGroup = (groupId) => {
  return(dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/planGroups?where=%7B%22id%22:%7B%22$eq%22:${groupId}%7D%7D`, 'GROUP'))
  }
}
