import ActionTypes from '../actions/list/listActionTypes'

const initialState = {
  pageNumber: 1,
  pageSize: 50,
  sortColumn: 'id',
  isAscending: false
}

export default list = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LISTRESET:
      return initialState
    case ActionTypes.FIRST:
      return {...state, pageNumber: 1}
    case ActionTypes.LAST:
      return {...state, pageNumber: Math.ceil(action.count/state.pageSize)}
    case ActionTypes.NEXT:
      return {...state, pageNumber: state.pageNumber + 1}
    case ActionTypes.PREVIOUS:
      return {...state, pageNumber: state.pageNumber - 1}
    case ActionTypes.INDEX:
      return {...state, pageNumber: action.pageNumber}
    case ActionTypes.SIZE:
      return {...state, pageNumber: action.pageNumber, pageSize: action.pageSize}
    case ActionTypes.SORT:
      return {...state, sortColumn: action.sortColumn, isAscending: action.isAscending}
    case ActionTypes.SEARCHPARAMS:
      return {...initialState, searchParams: action.searchParams,}
    case ActionTypes.CLEARSEARCH:
      return {...initialState, searchParams: null,}
    default:
      return state
  }
}
