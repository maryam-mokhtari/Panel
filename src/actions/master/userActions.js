import {fetch, loadInfo} from '../dynamicAction'
// endpoint, actionType, method, body, metaRequest, metaSuccess, isHeaderContent = true, isHeaderAccept = false

export function loadCurrentUser() {
  return async (dispatch, getState) => {
    if (getState().generalEntities.userData) {
      return Promise.resolve()
    } else {
      return await dispatch(fetch(`/cfs/rest/users/currentUser`, 'CURRENTUSER'))
    }
  }
}

export const loadUsers = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams,) => {
  let endpoint = `/cfs/rest/admin/adminUser/users?sort=${isAscending?'+':'-'}${sortColumn}${!lastParams.pageType || lastParams.pageType == 'all'? '': `&where=%7B%22profile.customerType%22:%7B%22$eq%22:${lastParams.pageType}%7D%7D`}`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'USERS')
}


export const loadUser = (userId) => {
  return (dispatch) => {
    return dispatch(fetch(`/cfs/rest/admin/adminUser/users?where=%7B%22id%22:%7B%22$eq%22:${userId}%7D%7D`, 'USER'))
  }
}

export const loadUserTransactions = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams,) => {
  let endpoint = `admin/transactions?sort=${isAscending?'+':'-'}${sortColumn}&where=%7B%22user.id%22:%7B%22$eq%22:${lastParams.userId}%7D%7D`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'USERTRANSACTIONS')
}

export const loadUserVmInvoices = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams,) => {
  let endpoint = `admin/vmBillInvoices?sort=${isAscending?'+':'-'}${sortColumn}&where=%7B%22invoice.user.id%22:%7B%22$eq%22:${lastParams.userId}%7D%7D`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'USERVMINVOICES')
}

export const loadUserInvoices = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams,) => {
  let endpoint = `/cfs/rest/admin/getInvoices?sort=${isAscending?'+':'-'}${sortColumn}&where=%7B%22user.id%22:%7B%22$eq%22:${lastParams.userId}%7D%7D`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'USERINVOICES')
}

export const loadUserOrders = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams,) => {
  let endpoint = `admin?sort=${isAscending?'+':'-'}${sortColumn}&where=%7B%22lastInvoice.user.id%22:%7B%22$eq%22:${lastParams.userId}%7D%7D`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'USERORDERS')
}

export const loadUserIPHistories = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams,) => {
  let endpoint = `admin/vmIps?sort=${isAscending?'+':'-'}${sortColumn}&where=%7B%22vmBill.owner.id%22:%7B%22$eq%22:${lastParams.userId}%7D%7D`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'USERIPHISTORIES')
}

export const updateBalance = (userId, balance) =>{
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${userId}/updateBalance`, 'UPDATEBALANCE', 'PUT', {balance: Number(balance) * 0.0001}))
    .then(() => dispatch(fetch(`/cfs/rest/admin/adminUser/users?where=%7B%22id%22:%7B%22$eq%22:${userId}%7D%7D`, 'USER')))
  }
}

export const loadUserPlan = (userId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/${userId}/planGroup`, 'USERPLAN'))
  }
}

export const loadUserUsers = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams,) => {
  let endpoint = `/cfs/rest/admin/${lastParams.userId}/planGroupUsers?sort=${isAscending?'+':'-'}${sortColumn}`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'USERUSERS')
}

export const changePassword = (currentPassword, newPassword) => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/users/changePassword', 'CHANGEPASS', 'PUT', {
      currentPassword,
      newPassword
    }))
  }
}
