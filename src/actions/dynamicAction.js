import { CALL_API } from 'redux-api-middleware'
import ActionTypes from './ActionTypes'
import {siteConfig} from '../utils/siteConfig'

export const fetch = (endpoint, actionType, method, body, metaRequest, metaSuccess,
    isHeaderContent = true, isHeaderAccept = false, headers = {}) => {
  console.log('fetch:', endpoint, actionType, method, body, metaRequest, metaSuccess,
  isHeaderContent, isHeaderAccept, headers);
  const clientCsrfToken = localStorage.getItem('client_csrf_token')
  const csrfToken = localStorage.getItem('csrf_token')
  if (!method) {
    method = 'GET'
  }
  if (!endpoint.startsWith('/')) {
    endpoint = '/cws/rest/' + endpoint
  }
  // let headers = {}
  if (isHeaderContent) {
    headers['Content-Type'] = 'application/json'
  }
  if (isHeaderAccept) {
    headers['Accept'] = 'application/json'
  }
  if (siteConfig.key == 'mtn' || location.href.includes('b2bcfs') || location.href.includes('local')) {
    if (csrfToken) {
      headers['token'] = csrfToken
    }
    if (clientCsrfToken) {
      headers['clienToken'] = clientCsrfToken
    }
  }
  console.log('headers is : ', headers)
  let request = {
    type: ActionTypes[actionType + '_REQUEST']
  }
  let success = {
    type: ActionTypes[actionType + '_SUCCESS'],
    payload: (action, state, response) => {
      console.log('success', actionType);
      if (response.headers.get('Content-Range')) {
        return response.json().then(data => ({
          data: data,
          range: response.headers.get('Content-Range')
        }))
      }
      return response.json()
    },
  }
  let failure = {
    type: ActionTypes[actionType + '_FAILURE'],
    payload: (action, state, response) => {
      return response.json()
    },
  }
  if (metaRequest) {
    request.meta = metaRequest
  }
  if (metaSuccess) {
    success.meta = metaSuccess
  }
  let callAPI = {
    endpoint,
    method,
    credentials: 'include',
    types: [
      request,
      success,
      failure
    ],
  }
  callAPI.headers = headers
  if (body) {
    callAPI.body = JSON.stringify(body)
  }
  console.log('CALL_API', callAPI);
  return {
    [CALL_API]: callAPI
  }
}

export const loadInfo = (pageNumber, pageSize, sortColumn, isAscending = true, endpoint, searchParams, actionType) => {
  return async (dispatch) => {
    const from = (pageNumber - 1) * pageSize
    const to = from + pageSize - 1
    // let endpoint = `/cfs/rest/admin/adminUser/users?sort=${isAscending?'+':'-'}${sortColumn}`
    if (searchParams) {
      // searchParams: e.g. [{type: 'name', value: 'Maryam'},]
      if (endpoint.includes('where=%7B')) {
        endpoint = endpoint.substr(0, endpoint.length - 3) + ',' // remove '%7D'
      } else {
        endpoint += '&where=%7B'
      }
      endpoint += searchParams.filter(item => item.value && item.value != '')
      .map(item => {
        // 1: start
        // 2: end
        if (item.type.endsWith('1') || item.type.endsWith('2')) { // e.g. ivoice.from1
        const itemtype = item.type.substr(0, item.type.length - 1) // Remove 1|2 from the end
        const startEnd = searchParams.filter(itm => itm.value && itm.value != ''
        && itm.type.includes(itemtype)) // fetch an array including both 1 and 2
        console.log('startEnd', item, startEnd);
        let itemvalue = ''
        if (startEnd.length == 2) {
          if (item.type.endsWith('1')) {
            itemvalue = new Date(startEnd[0].value).getTime() + ',' + new Date(startEnd[1].value).getTime()
          } else {
            // only ONE check on two items
            return
          }
        } else if (startEnd.length == 1) {
          if (startEnd[0].type.endsWith('1')) {
            itemvalue = new Date(startEnd[0].value).getTime() + ',NaN'
          } else if (startEnd[0].type.endsWith('2')) {
            itemvalue = 'NaN,' + new Date(startEnd[0].value).getTime()
          }
        }
        return `%22${itemtype}%22:%7B%22$btw%22:%22${itemvalue}%22%7D`
      }
      return `%22${item.type}%22:%7B%22$${item.value == 'false' || item.value == 'true'
        || ['primaryDisk', 'cpuCores', 'ram'].includes(item.type)
        || item.type.includes('id')?
        'eq': 'lk'}%22:%22${typeof(item.value) == 'string'? item.value.trim(): item.value}%22%7D`
      })
      .join(',') + '%7D'
    }
    console.log('range action:', pageNumber, pageSize, sortColumn, isAscending, from, to, searchParams);
    return dispatch(fetch(endpoint, actionType, 'GET', null, null, null, true, false, {'Range': `items=${from}-${to}`}))
  }
}
