import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {
  loadUser, loadCurrentUser, changePassword,
  loadUserTransactions, loadUserOrders, loadUserIPHistories, updateBalance, loadUserInvoices, loadUserVmInvoices, loadUserAuthorization,
  enableUserAuthorization, disableUserAuthorization, getAuthorizationDocuments,
  loadUserPlan, loadUserUsers, loginAsClient,
  setAuthDocStatus, authDocStatus,
  showMessage,
  // authDocStatusData, authDocStatusLoading, setAuthDocStatusLoading,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,

} from '../../../actions'
import UserTabs from '../../components/user/UserTabs'
import UserTransactions from '../../components/user/UserTransactions'
import UserOrders from '../../components/user/UserOrders'
import UserIPHistories from '../../components/user/UserIPHistories'
import UserInvoices from '../../components/user/UserInvoices'
import UserAuthorization from '../../components/user/UserAuthorization'
import UserVmInvoices from '../../components/user/UserVmInvoices'
import UserInformation from '../../components/user/UserInformation'
import UserPlan from '../../components/user/UserPlan'
import UserPassword from '../../components/user/UserPassword'
import UserUsers from '../../components/user/UserUsers'
import Loading from '../../components/general/Loading'
import { getNormalizedDigit, } from '../../../utils/normalize'
import { clearFormGeneratorModal, } from '../../../utils/form'
import { isUserInRole, ADMIN } from '../../../utils/role'
import { siteConfig } from '../../../utils/siteConfig'
import { baseRoute } from '../../../utils/route'
import { isArrayOK } from '../../../utils/array'
import {language, ln, dir} from '../../../utils/language'


class UserPage extends Component {
  componentDidMount() {
    this.preloadData()
  }
  async preloadData() {
    await this.props.loadCurrentUser()
    this.props.loadUser(this.props.userId)
  }
  componentDidUpdate(nextProps) {
    if (this.props.userId && nextProps.userId && this.props.userId != nextProps.userId) {
      this.preloadData()
    }
  }
  render() {
    // console.log('UserPage props : ', this.props)
    // let messages = language.key=='en' ? language.en.messages : language.fa.messages
    // console.log('language messages is : ', messages)
    const {
      messageText, messageType,
      userLoading, userId, userData,
      userTransactionsData, userTransactionsCount,
      userVmInvoicesData, userVmInvoicesCount,
      userInvoicesData, userInvoicesCount,
      userOrdersData, userOrdersCount,
      userIPHistoriesData, userIPHistoriesCount,
      userTransactionLoading, userOrdersLoading, userIPHistoriesLoading,
      dispatch, loadUserTransactions, loadUserOrders, loadUserIPHistories, updateBalanceLoading, updateBalance,
      getAuthorizationDocuments, changePassword,
      isLoginAsClientSuccess, changePasswordLoading,
      userDocuments, documentsLoading,
      userInvoicesLoading, loadUserInvoices, loadUserVmInvoices,
      userVmInvoicesLoading, loadUserAuthorization, userAuthorizationLoading,
      loadUserPlan, loadUserUsers, loginAsClient, loginAsClientLoading,
      userPlanLoading, userPlanData,
      userUsersLoading, userUsersData, userUsersCount,
      userAuthorizationData, enableUserAuthorization, disableUserAuthorization,
      userAuthorizationEnableLoading, userAuthorizationDisableLoading,
      setAuthDocStatus, authDocStatus, showMessage,
      authDocStatusData, authDocStatusLoading, setAuthDocStatusLoading,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
    } = this.props
    console.log('UserPage props', this.props);
    let user = userLoading==false? (this.props.user?this.props.user: userData?[userData]:undefined): undefined
    const isOwnPage = this.props.user && isArrayOK(this.props.user) && userData && this.props.user[0].id == userData.id
    const userNameStyle = {[dir('reverseAlign')]: 50}
    const userIconStyle = {[dir('reverseAlign')]: 10}
    const isUserCwsAdmin = isUserInRole(ADMIN.superadmin, userData) || isUserInRole(ADMIN.admincws, userData)
    const isUserCfsAdmin = isUserInRole(ADMIN.superadmin, userData) || isUserInRole(ADMIN.admincfs, userData)
    const isGroupAdmin = isUserInRole(ADMIN.groupadmin, userData)
    const isAuthorizationAdmin = isUserInRole(ADMIN.authorization, userData)
    const isInvoiceAdmin = isUserInRole(ADMIN.invoice, userData)
    const isMainAdmin = isUserCfsAdmin || isUserCwsAdmin

    const listHandlers = {next, previous, setPage, changeSort, changePageSize,
      resetList, first, last, setSearchParams, clearSearchParams,
    }
    const baseColor = siteConfig[siteConfig.key].headerBackground

    const tabsHandlers = {loadUserAuthorization, getAuthorizationDocuments, loadUserTransactions,
      loadUserVmInvoices, loadUserOrders, loadUserIPHistories, loadUserInvoices,
      setAuthDocStatus, authDocStatus,
      loadUserPlan, loadUserUsers, loginAsClient,
    }
    const tabsProps = {tabsHandlers, baseColor, isUserCwsAdmin, isUserCfsAdmin, isMainAdmin, isGroupAdmin,
      isAuthorizationAdmin, isInvoiceAdmin,
      pageNumber, pageSize, sortColumn, isAscending, searchParams, userId, isOwnPage,
    }

    const UserInformationProps = {user, userLoading, baseColor}

    const transactionProps = {
      userTransactionLoading, userTransactionsData, userTransactionsCount,
      userId, dispatch,
      updateBalanceLoading, user,
      handlers: { updateBalance, },
      listHandlers: { ...listHandlers, loadData: loadUserVmInvoices },
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    }

    const userOrdersProps = {
      userOrdersLoading, userOrdersData, userOrdersCount,
      userId, dispatch,
      listHandlers: { ...listHandlers, loadData: loadUserOrders },
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    }

    const userInvoicesProps = {
      userInvoicesLoading, userInvoicesData, userInvoicesCount, userId, dispatch,
      listHandlers: { ...listHandlers, loadData: loadUserInvoices },
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    }

    const vmInvoicesProps = {
      userVmInvoicesLoading, userVmInvoicesData, userVmInvoicesCount, userId, dispatch,
      listHandlers: { ...listHandlers, loadData: loadUserVmInvoices },
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    }
    // const userIPHistoriesProps = { ...userOrdersProps, isIPHistory: true }

    const userIPHistoriesProps = {
      userIPHistoriesLoading, userIPHistoriesData, userIPHistoriesCount,
      userId, dispatch,
      listHandlers: { ...listHandlers, loadData: loadUserIPHistories },
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    }

    const userAuthorizationProps = {
      userId, userAuthorizationLoading, userAuthorizationEnableLoading, userAuthorizationDisableLoading
      , userAuthorizationData, userData, user,
      userDocuments, documentsLoading,
      authDocStatusData, authDocStatusLoading, setAuthDocStatusLoading,
      handlers: {
        setAuthDocStatus, authDocStatus,
        // getAuthorizationDocuments,
        loadUserAuthorization,
        enableUserAuthorization,
        disableUserAuthorization,
      }
    }
    const userPlanUsersProps = {
      userPlanLoading, userPlanData
    }
    const userUsersProps = {
      userId, dispatch,
      listHandlers: { ...listHandlers, loadData: loadUserUsers },
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      userUsersLoading, userUsersData, userUsersCount,
      loginAsClient, loginAsClientLoading,
      isLoginAsClientSuccess,
    }
    const userPasswordProps = {
      messageText, messageType,
      changePasswordLoading,
      handlers: {changePassword, showMessage,}
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('userInformation')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/users`}>{ln('users')}</Link></li>
            <li className="active">{ln('userData')}</li>
          </ol>
        </section>
        <section className="content">

          <div className="row">

            <div className="col-md-12">
              <div className="box user-profile-box box-widget">

                <div className="box user-profile-box box-widget widget-user-2">

                  <div className="box-footer no-padding" style={{ background: '#ecf0f5' }}>

                    {userLoading ?
                      <Loading />
                      :
                      isArrayOK(user) &&
                      <div className="tabs">
                        <span className="lg-show en-for-fa">
                          <span className={`user-name text-user-${baseColor}`}
                            style={userNameStyle}>
                            {user && user[0].username}
                          </span>
                          <img className="user-icon user-img"
                            style={userIconStyle}
                            src={`https://www.gravatar.com/avatar/${user && user[0].md5}?d=blank&s=0`} />
                        </span>

                        <UserTabs {...tabsProps} />

                        { user &&
                          <div className="tab-content user-tab-content clearfix">
                            <UserInformation {...UserInformationProps} />
                            {(isMainAdmin || isAuthorizationAdmin) && !isOwnPage && <UserAuthorization {...userAuthorizationProps} />}
                            {isMainAdmin && !isOwnPage && <UserTransactions {...transactionProps} />}
                            {isUserCwsAdmin && !isOwnPage && <UserVmInvoices {...vmInvoicesProps} /> }
                            {isUserCwsAdmin && !isOwnPage && <UserOrders {...userOrdersProps} /> }
                            {isUserCwsAdmin && !isOwnPage && <UserIPHistories {...userIPHistoriesProps} /> }
                            {(isMainAdmin || isInvoiceAdmin) && !isOwnPage && <UserInvoices {...userInvoicesProps} />}
                            {isUserCfsAdmin && !isOwnPage && <UserPlan {...userPlanUsersProps} />}
                            {isUserCfsAdmin && !isOwnPage && <UserUsers {...userUsersProps} />}
                            {(isOwnPage || isGroupAdmin) && <UserPassword {...userPasswordProps} />}
                          </div>
                        }
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { userId } = ownProps.params
  const {
    userLoading, user,
    userTransactionsData, userTransactionsCount,
    userVmInvoicesData, userVmInvoicesCount,
    userInvoicesData, userInvoicesCount,
    userOrdersData, userOrdersCount,
    userIPHistoriesData, userIPHistoriesCount,
    userTransactionLoading, userOrdersLoading, userIPHistoriesLoading,
    updateBalanceLoading,
    userInvoicesLoading,
    userPlanLoading, userPlanData,
    userUsersLoading, userUsersData, userUsersCount,
    userVmInvoicesLoading, userAuthorizationLoading, userAuthorizationData,
    userAuthorizationEnableLoading, userAuthorizationDisableLoading,
    authDocStatusData, authDocStatusLoading, setAuthDocStatusLoading,
    userDocuments, documentsLoading, changePasswordLoading,
  } = state.masterEntities
  const {
    isLoginAsClientSuccess, loginAsClientLoading,
  } = state.businessEntities
  const {userData, userDataLoading,
    // messageText, messageType
  } = state.generalEntities
  const entities = baseRoute.isBusiness? state.businessEntities: state.masterEntities
  const { messageText, messageType } = entities
  if (userData && !userId) {
    userId = userData.id
  }
  const {pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list
  return {
    messageText, messageType,
    userLoading,
    user, userId,
    userTransactionsData, userTransactionsCount,
    userVmInvoicesData, userVmInvoicesCount,
    userInvoicesData, userInvoicesCount,
    userOrdersData, userOrdersCount,
    userPlanLoading, userPlanData,
    userUsersLoading, userUsersData, userUsersCount,
    userIPHistoriesData, userIPHistoriesCount,
    userTransactionLoading, userOrdersLoading, userIPHistoriesLoading,
    updateBalanceLoading, userData, userDocuments, documentsLoading,
    userInvoicesLoading, loginAsClientLoading,
    isLoginAsClientSuccess, changePasswordLoading,
    userVmInvoicesLoading, userAuthorizationLoading, userAuthorizationData,
    userAuthorizationEnableLoading, userAuthorizationDisableLoading,
    authDocStatusData, authDocStatusLoading, setAuthDocStatusLoading,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      setAuthDocStatus, authDocStatus,
      loadUser, loadCurrentUser, loadUserVmInvoices,
      loadUserTransactions, loadUserOrders, loadUserIPHistories, updateBalance, loadUserInvoices, loadUserAuthorization,
      loadUserPlan, loadUserUsers, loginAsClient, changePassword,
      enableUserAuthorization, disableUserAuthorization, showMessage,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last,
      setSearchParams, clearSearchParams, getAuthorizationDocuments,
    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
