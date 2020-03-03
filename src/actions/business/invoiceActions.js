import {fetch} from '../dynamicAction'


export const loadBilling = () => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/invoices?where=%5B%7B"product.category":%7B"$eq":"CFS"%7D%7D,%7B"dueDate":%7B"$gt":${new Date().getTime()}%7D,"paid":%7B"$eq":true%7D%7D%5D&match=AND&matchInner=OR&sort=+paid,-createdAt`, 'B_INVOICES'))
  }
}

export const offlinePayment = (invoiceId, trackDate) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/invoices/${invoiceId}/setInvoiceTrack?trackDate=${trackDate}`, 'B_OFFLINEPAYMENT', 'PUT',
      null, null, null, true, true))
      .then(() => dispatch(fetch(`/cfs/rest/invoices?where=%5B%7B"product.category":%7B"$eq":"CFS"%7D%7D,%7B"dueDate":%7B"$gt":${new Date().getTime()}%7D,"paid":%7B"$eq":true%7D%7D%5D&match=AND&matchInner=OR&sort=+paid,-createdAt`, 'B_INVOICES')))
  }
}

export const loadInvoice = (invoiceId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/invoices/${invoiceId}`, 'B_INVOICE'))
  }
}

export const assignPayIdentifier = (invoiceId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/invoices/${invoiceId}/assignPayIdentifier`, 'B_PAYIDENTIFIER', 'PUT'))
  }
}

export const getPaymentBank = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('/cfs/rest/invoices/getPaymentBank', 'B_PAYMENTBANK'))
  }
}
