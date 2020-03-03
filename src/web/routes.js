import React from 'react'
import Route from 'react-router/lib/Route'
import { baseRoute } from '../utils/route'
import App from './containers/general/App'
import HypsPage from './containers/master/vps/HypsPage'
import IPsPage from './containers/master/vps/IPsPage'
import VmBillsPage from './containers/master/vps/VmBillsPage'
import VmbillSinglePage from './containers/master/vps/VmbillSinglePage'
import HypDetailPage from './containers/master/vps/HypDetailPage'
import IPHistoryPage from './containers/master/vps/IPHistoryPage'
import VPSInvoicesPage from './containers/master/vps/InvoicesPage'
import UsersPage from './containers/master/cfs/UsersPage'
import PlansPage from './containers/master/cfs/PlansPage'
import GroupsPage from './containers/master/cfs/GroupsPage'
import AddGroupPage from './containers/master/cfs/AddGroupPage'
import GroupPage from './containers/master/cfs/GroupPage'
import UpgradeGroupPage from './containers/master/cfs/UpgradeGroupPage'
import PlanPage from './containers/master/cfs/PlanPage'
import CFSInvoicesPage from './containers/master/cfs/InvoicesPage'
import InvoiceSinglePage from './containers/master/cfs/InvoiceSinglePage'
import DashboardPage from './containers/general/DashboardPage'
import AuthorizationPage from './containers/master/cfs/AuthorizationPage'
import ChartsPage from './containers/general/ChartsPage'
import NewUserPage from './containers/business/NewUserPage'
import UserPage from './containers/user/UserPage'
import FirstPage from './containers/general/FirstPage'
import NoAccessPage from './containers/general/NoAccessPage'
import BuyPlanPage from './containers/business/PlanPage'
import PlanDetailsPage from './containers/business/PlanDetailsPage'
import UsersSettingPage from './containers/business/UsersPage'
import BillingPage from './containers/business/BillingPage'
import InvoicePage from './containers/business/InvoicePage'
import AboutPage from './containers/general/AboutPage'

export default (
  <Route path="" component={App}>
    <Route path={`/${baseRoute.master}/charts`} component={ChartsPage} />
    <Route path={`/${baseRoute.master}/group`} component={AddGroupPage} />
    <Route path={`/${baseRoute.master}/group/:groupId`} component={GroupPage} />
    <Route path={`/${baseRoute.master}/group/upgrade/:groupId`} component={UpgradeGroupPage} />
    <Route path={`/${baseRoute.master}/groups`} component={GroupsPage} />
    <Route path={`/${baseRoute.master}/plans`} component={PlansPage} />
    <Route path={`/${baseRoute.master}/plan/:productId`} component={PlanPage} />
    <Route path={`/${baseRoute.master}/plan`} component={PlanPage} />
    <Route path={`/${baseRoute.master}/vinvoice/:invoiceId`} component={InvoiceSinglePage} />
    <Route path={`/${baseRoute.master}/invoice/:invoiceId`} component={InvoicePage} />
    <Route path={`/${baseRoute.master}/invoices/:status/:userId`} component={CFSInvoicesPage} />
    <Route path={`/${baseRoute.master}/invoices/:status`} component={CFSInvoicesPage} />
    <Route path={`/${baseRoute.master}/invoices`} component={CFSInvoicesPage} />
    <Route path={`/${baseRoute.master}/vminvoices`} component={VPSInvoicesPage} />
    <Route path={`/${baseRoute.master}/user/:userId`} component={UserPage} />
    <Route path={`/${baseRoute.master}/user`} component={UserPage} />
    <Route path={`/${baseRoute.master}/users/:pageType`} component={UsersPage} />
    <Route path={`/${baseRoute.master}/users`} component={UsersPage} />
    <Route path={`/${baseRoute.master}/ip/:ip`} component={IPHistoryPage} />
    <Route path={`/${baseRoute.master}/ips`} component={IPsPage} />
    <Route path={`/${baseRoute.master}/vmbill/:vmbillId/:hypId`} component={VmbillSinglePage} />
    <Route path={`/${baseRoute.master}/vmbill/:vmbillId`} component={VmbillSinglePage} />
    <Route path={`/${baseRoute.master}/vmbills/:vmState`} component={VmBillsPage} />
    <Route path={`/${baseRoute.master}/vmbills`} component={VmBillsPage} />
    <Route path={`/${baseRoute.master}/hyp/:hypId/vmbills/:vmState`} component={VmBillsPage} />
    <Route path={`/${baseRoute.master}/hyp/:hypId/vmbills`} component={VmBillsPage} />
    <Route path={`/${baseRoute.master}/hyp/:hypId`} component={HypDetailPage} />
    <Route path={`/${baseRoute.master}/hyps`} component={HypsPage} />
    <Route path={`/${baseRoute.master}/authorization`} component={AuthorizationPage} />
    <Route path={`/${baseRoute.master}/dashboard`} component={DashboardPage} />
    <Route path={`/${baseRoute.master}`} component={DashboardPage} />

    <Route path={`/${baseRoute.business}`} component={DashboardPage} />
    <Route path={`/${baseRoute.business}/about`} component={AboutPage} />
    <Route path={`/${baseRoute.business}/noaccess`} component={NoAccessPage} />
    <Route path={`/${baseRoute.business}/charts`} component={ChartsPage} />
    <Route path={`/${baseRoute.business}/newuser`} component={NewUserPage} />
    <Route path={`/${baseRoute.business}/dashboard`} component={DashboardPage} />
    <Route path={`/${baseRoute.business}/plan`} component={BuyPlanPage} />
    <Route path={`/${baseRoute.business}/planInfo`} component={PlanDetailsPage} />
    <Route path={`/${baseRoute.business}/users`} component={UsersSettingPage} />
    <Route path={`/${baseRoute.business}/user/:userId`} component={UserPage} />
    <Route path={`/${baseRoute.business}/user`} component={UserPage} />
    <Route path={`/${baseRoute.business}/invoices`} component={BillingPage} />
    <Route path={`/${baseRoute.business}/invoice/:invoiceId`} component={InvoicePage} />

  </Route>
)
