import ActionTypes from './listActionTypes'

export const next = () => {
  return {type: ActionTypes.NEXT}
}

export const previous = () => {
  return {type: ActionTypes.PREVIOUS}
}

export const first = () => {
  return {type: ActionTypes.FIRST}
}

export const last = (count) => {
  return {type: ActionTypes.LAST, count, }
}

export const setPage = (pageNumber) => {
  return {
    type: ActionTypes.INDEX,
    pageNumber,
  }
}

export const changeSort = (sortColumn, isAscending) => {
  return {
    type: ActionTypes.SORT,
    isAscending,
    sortColumn,
  }
}

export const changePageSize = (pageNumber, pageSize) => {
  return {
    type: ActionTypes.SIZE,
    pageNumber,
    pageSize,
  }
}

export const resetList = () => {
  return {
    type: ActionTypes.LISTRESET,
  }
}

export const setSearchParams = (searchParams) => {
  return {
    type: ActionTypes.SEARCHPARAMS,
    searchParams,
  }
}

export const clearSearchParams = () => {
  return {
    type: ActionTypes.CLEARSEARCH,
  }
}
