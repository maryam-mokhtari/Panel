import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import browserHistory from 'react-router/lib/browserHistory'
import syncHistoryWithStore from 'react-router-redux/lib/sync'
import Root from './src/web/containers/Root'
import configureStore from './src/store/configureStore'
// import BootstrapCSS from './src/assets/lib/bootstrap/css/bootstrap.min.css'
// import BootstrapJs from './src/assets/lib/bootstrap/js/bootstrap.min.js'
// import BootstrapRLTCSS from './src/assets/lib/bootstrap-rtl/css/bootstrap-rtl.min.css'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
