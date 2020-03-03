import { fetch, loadInfo } from '../dynamicAction'

export const loadCFSInvoices = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams) => {
  let { status, userId } = lastParams
  let endpoint = `/cfs/rest/admin/getInvoices?sort=${isAscending ? '+' : '-'}${sortColumn}`
  status = status == 'all' ? null : status
  if (status) {
    let statusParam = { type: 'invoiceStatus', value: status.toUpperCase() }
    searchParams = searchParams ? [...searchParams, statusParam] : [statusParam]
  }
  if (userId) {
    endpoint += `&userId=${userId}`
  }
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'CFSINVOICES')
}

export const loadSingleInvoice = (id) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/getInvoices?where=%7B%22id%22:%7B%22$eq%22:%22${id}%22%7D%7D`, 'CFSINVOICE', ))
  }
}

export const payInvoice = (id, paymentDate) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/${id}/payInvoice?paydate=${paymentDate}`,
      'CFSPAYINVOICE', 'PUT', null, id, null,true, true ))
  }
}

export const rejectInvoicePayment = (invoiceid, due, description) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/${invoiceid}/rejectInvoice?due=${due}`, 'CFSREJECTINVOICEPAY', 'PUT', {description}, invoiceid,null,true, true))
  }
}
