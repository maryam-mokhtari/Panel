import {fetch} from '../dynamicAction'

export const loadCFSUploadsCharts = (from, to) => {
  from = new Date(from).getTime()
  to = new Date(to).getTime()
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/getGroupUploadData?from=${from}&to=${to}`, 'UPLOADCHART'))
  }
}

export const loadCFSDownloadsCharts = (from, to) => {
  from = new Date(from).getTime()
  to = new Date(to).getTime()
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/admin/getGroupDlData?from=${from}&to=${to}`, 'DOWNLOADCHART'))
  }
}
