import {fetch, loadInfo} from '../dynamicAction'

export const loadInvoices = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams) => {
  let endpoint = `admin/vmBillInvoices?sort=${isAscending?'+':'-'}${sortColumn}`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'INVOICES')
}
