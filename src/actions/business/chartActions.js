import {fetch} from '../dynamicAction'

export const loadBCFSUploadsCharts = (from, to, groupId) => {
  from = new Date(from).getTime()
  to = new Date(to).getTime()
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroups/${groupId}/uploadCount?from=${from}&to=${to}`, 'B_UPLOADCHART'))
  }
}

export const loadBCFSDownloadsCharts = (from, to, groupId) => {
  from = new Date(from).getTime()
  to = new Date(to).getTime()
  return (dispatch, getState) => {
    return dispatch(fetch(`/cfs/rest/planGroups/${groupId}/downloadCount?from=${from}&to=${to}`, 'B_DOWNLOADCHART'))
  }
}
