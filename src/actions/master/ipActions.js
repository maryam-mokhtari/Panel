import {fetch} from '../dynamicAction'

export const loadIPs = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('admin/distinctVmIps', 'IPS'))
  }
}

export const loadIPHistory = (ip) => {
  return async (dispatch, getState) => {
    return await dispatch(fetch(`admin/vmIps?where=%7B%22ip%22:%7B%22$eq%22:${ip}%7D%7D`, 'IPHISTORY'))
  }
}
