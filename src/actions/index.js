import * as listActions from './list/listActions'
import * as generalActions from './general/generalActions'
import * as languageActions from './language/languageActions'

import * as masterGeneralActions from './master/generalActions'
import * as hypActions from './master/hypActions'
import * as isoActions from './master/isoActions'
import * as userActions from './master/userActions'
import * as vmActions from './master/vmActions'
import * as ipActions from './master/ipActions'
import * as invoiceActions from './master/invoiceActions'
import * as productActions from './master/productActions'
import * as groupActions from './master/groupActions'
import * as cfsInvoiceAction from './master/cfsInvoiceActions'
import * as cfsChartActions from './master/cfsChartActions'
import * as authorizeActions from './master/authorizeActions'

import * as chartActions from './business/chartActions'
import * as planActions from './business/planActions'
import * as usersActions from './business/usersActions'
import * as businessUserActions from './business/userActions'
import * as businessInvoiceActions from './business/invoiceActions'

module.exports = {
  ...generalActions,
  ...languageActions,

  ...masterGeneralActions,
  ...hypActions,
  ...isoActions,
  ...listActions,
  ...userActions,
  ...vmActions,
  ...ipActions,
  ...invoiceActions,
  ...productActions,
  ...groupActions,
  ...cfsInvoiceAction,
  ...cfsChartActions,
  ...authorizeActions,

  // business
  ...chartActions,
  ...planActions,
  ...usersActions,
  ...businessUserActions,
  ...businessInvoiceActions,
}
