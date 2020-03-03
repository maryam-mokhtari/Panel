import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware';
import {routerMiddleware, routerReducer} from 'react-router-redux'
import browserHistory from 'react-router/lib/browserHistory'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);


export default configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        apiMiddleware,
        routerMiddleware(browserHistory),
        thunk,
      ),
    )
  )

  return store
}
