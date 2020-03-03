import {fetch, loadInfo} from '../dynamicAction'
// endpoint, actionType, method, body, metaRequest, metaSuccess, isHeaderContent = true, isHeaderAccept = false

export const loadVmBills = (pageNumber, pageSize, sortColumn, isAscending = true, searchParams, lastParams) => {
  //hypId, vmState) {
  const {hypId, vmState} = lastParams
  console.log('loadVmBills:', pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams,);
  let prefix = hypId? `/hypVmList?hypId=${hypId}&` : '?'
  prefix += vmState? `where=%7B"vm.state":%7B"$eq":"${vmState.toUpperCase()}"%7D%7D&`: ''
  let endpoint = `admin${prefix}sort=${isAscending?'+':'-'}${sortColumn}`
  return loadInfo(pageNumber, pageSize, sortColumn, isAscending, endpoint, searchParams, 'VMBILLS')
}

export const loadSingleVmbill = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/state`, 'VMBILLSINGLE'))
  }
}

export const loadDumpXml = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/dumpxml`, 'DUMPXML'))
  }
}

export const pinVm = (vmbillId, hypId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/pin`, 'PIN', 'PUT',
    {
      hypId,
    }))
  }
}

export const unpinVm = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/pin`, 'UNPIN', 'DELETE',))
  }
}

export const retryActionVm = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/retry`, 'RETRYCREATE', 'PUT',))
    .then(() => dispatch(fetch(`admin/${vmbillId}/state`, 'VMBILLSINGLE')))
  }
}

export const migrateVm = (vmbillId, hypId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/migrate`, 'MIGRATE', 'PUT',
    {
      hypervisor_id: Number(hypId),
    }))
  }
}

export const finalizeMigrateVm = (vmbillId, hypId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/finalizeMigration`, 'FINALIZEMIGRATE', 'PUT',))
  }
}


export const loadBackups = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/backupList`, 'LISTBACKUP',))
  }
}

export const backup = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/backup`, 'MAKEBACKUP', 'POST',))
    .then(()=> dispatch(fetch(`admin/${vmbillId}/backupList`, 'LISTBACKUP',)))
  }
}

export const deleteBackup = (vmbackupId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbackupId}/inactiveBackup`, 'DELETEBACKUP', 'PUT', null, vmbackupId))
    .then(()=> dispatch(fetch(`admin/${vmbillId}/backupList`, 'LISTBACKUP',)))
  }
}

export const restoreBackup = (vmbillId, vmbackupId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/restore`, 'RESTOREBACKUP', 'POST',
    {vmbackup_id: vmbackupId}, vmbackupId,
    ))
    .then(()=> dispatch(fetch(`admin/${vmbillId}/backupList`, 'LISTBACKUP',)))
  }
}

export const deleteVm = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/deleteVm`, 'DELETEVM', 'PUT',))
    .then(() => dispatch(fetch(`admin/${vmbillId}/state`, 'VMBILLSINGLE')))
  }
}
// export function removeVMFromQueue(vmbillId) {
//   return (dispatch, getState) => {
//     return dispatch(fetch(`admin/{sysname}/removeQueue`, 'DEQUEUEVM', 'PUT'))
//   }
// }
export const renewVm = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/renewal`, 'RENEWVM', ))
    .then(() => dispatch(fetch(`admin/${vmbillId}/state`, 'VMBILLSINGLE')))
  }
}
export const createVm = (invoiceId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/retry?invoiceId=${invoiceId}`, 'CREATEVM', 'POST'))
    .then(() => dispatch(fetch(`admin/${vmbillId}/state`, 'VMBILLSINGLE')))
  }
}

export const powerVm = (vmbillId, powerAction) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/power`, 'POWERVM', 'PUT', {powerAction}, powerAction, powerAction))
    .then(() => dispatch(fetch(`admin/${vmbillId}/state`, 'VMBILLSINGLE')))
  }
}

export const dequeue = (sysname) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${sysname}/removeQueue`, 'DEQUEUEVM', 'DELETE', null, sysname))
  }
}

export const loadVmInvoices = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/invoiceList`, 'VMINVOICES'))
  }
}

export const updateVmInvoice = (invoiceId, totalPrice, from, to, dueDate, paid) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${invoiceId}/updateInvoice`, 'UPDATEINVOICE', 'PUT',
    {
      dueDate: new Date(dueDate).getTime(),
      from: new Date(from).getTime(),
      to: new Date(to).getTime(),
      totalPrice: totalPrice / 10000,
      paid,
    }
  ))
  }
}

export const getvmOS = () => {
  return (dispatch, getState) => {
    return dispatch(fetch(`/cws/rest/vmOSs`, 'OS'))
  }
}

export const resetBrush = (vmbillId) => {
  return (dispatch, getState) => {
    return dispatch(fetch(`admin/${vmbillId}/restBrush`, 'RESETBRUSH', 'DELETE'))
    .then(() => dispatch(fetch(`admin/${vmbillId}/state`, 'VMBILLSINGLE')))
  }
}
