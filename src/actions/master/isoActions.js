import {fetch} from '../dynamicAction'

function fetchISO() {
  fetch('admin/isoFiles', 'ISO', 'GET', null, null, null, true, true)
}

export const loadISO = () => {
  return (dispatch, getState) => {
    return dispatch(fetch('admin/isoFiles', 'ISO', 'GET', null, null, null, true, true))
  }
}

export const deleteISO = (hypId, isoId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${hypId}/${isoId}/isoInfo`, 'DELETEISO', 'DELETE', null, isoId))
    .then(() => dispatch(fetch('admin/isoFiles', 'ISO', 'GET', null, null, null, true, true)))
  }
}

export const uploadISO = (hypId, name, url, md5) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${hypId}/isoInfo`, 'UPLOADISO', 'POST',
    {
      name,
      url,
      md5,
    }
  )).then(() => dispatch(fetch('admin/isoFiles', 'ISO', 'GET', null, null, null, true, true)))
}
}

export const getISOMd5 = (hypId, isoId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${hypId}/${isoId}/isoChecksumMD5`, 'GETISOMD5'))
  }
}

export const validateISO = (hypId, isoId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${hypId}/${isoId}/validateIso`, 'VALIDATEISO', 'PUT', null, isoId))
    .then(() => dispatch(fetch('admin/isoFiles', 'ISO', 'GET', null, null, null, true, true)))
  }
}
