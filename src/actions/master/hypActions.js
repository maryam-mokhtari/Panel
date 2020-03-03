import {fetch} from '../dynamicAction'
// ** fetch input:
// endpoint, actionType, method, body, metaRequest, metaSuccess, isHeaderContent = true, isHeaderAccept = false, headers={}
export const loadHyps = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('admin/getResourceInfo', 'HYPS'))
  }
}

export const loadHypsDetails = (hypId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/getHypsInfoDetails?where=%5B%7B"id":%7B"$eq":"${hypId}"%7D%7D%5D`, 'HYPDETAIL'))
  }
}

export const loadLocations = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('locations', 'LOCATION'))
  }
}

export const addHyp = (name, ipAddress, validIpAddress, cpuCores, ram, zfsArrayName, location) => {
  return (dispatch, getState) => {
    return dispatch(fetch('hypervisors', 'ADDHYP', 'POST',
      {
        cpuCores, ipAddress, validIpAddress, name, ram, state:'READY',
        zfsArrayName,
        location:{id:location,}
      }
    ))
  }
}

export const loadUsageHyps = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('admin/hypsUsage', 'HYPUSAGE'))
  }
}

export const hypUpdatePassword = (hypId, password) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`hypervisors/${hypId}/updatePassword`, 'UPDATEPASS', 'PUT',
    {
      password,
    }
  ))
}
}

export const deleteHyp = (hypId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`hypervisors/${hypId}`, 'DELETEHYP', 'DELETE'))
  }
}

export const runCommand = (service, type, hypId) => {
  return  (dispatch, getState) => {
    return  dispatch(fetch(`hypervisors/${hypId}/takeCommand`, 'COMMAND', 'PUT',
    {
      service,
      type,
    },
    service+type, [service,type],
    // true, true,
  ))
}
}
