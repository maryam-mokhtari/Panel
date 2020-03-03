import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import {
  loadCurrentUser, loadHyps, clearMessage, clearUser,
  clearHyp, changeLanguage, loadBilling,
  loadPlanGroup, hasGroupAdmin, getGroupUsersCount, togglePage
} from '../../../actions'
import Message from '../../components/general/Message'
import Loading from '../../components/general/Loading'
import SideBar from '../../components/general/App/SideBar'
import Footer from '../../components/general/App/Footer'
import GeneralSearch from '../../components/general/App/GeneralSearch'
import AppHeaderUserProfile from '../../components/general/App/HeaderUserProfile'
import { percentColor, changeBaseColor, } from '../../../utils/color'
import { buildMessage, } from '../../../utils/message'
import { isUserInRole, getUserRole, ADMIN, } from '../../../utils/role'
import { listConstants, } from '../../../utils/list'
import { siteConfig } from '../../../utils/siteConfig'
import { baseRoute } from '../../../utils/route'
import { setCookie } from '../../../utils/cookie'
import { isArrayOK } from '../../../utils/array'
import { language, ln, dir } from '../../../utils/language'

import homePageIcon from '../../../../design/icons/Home.png'
import profileImage from '../../../../design/dist/img/mtn/profileImage.png'


class App extends Component {
  constructor(props) {
    super(props)
    this.noPlan = true
    this.state = {
      pageCollapsed: true
    }
  }
  toggleLanguage(userId) {
    const newLang = language.key == 'fa' ? 'en' : 'fa'
    const langId = newLang == 'en' ? 2 : 1
    localStorage.setItem('language', newLang)
    this.props.changeLanguage(userId, langId)
    location.reload()
  }
  componentWillMount() {
    this.preloadData()
  }
  componentDidMount() {
    this.loadData()
  }
  async preloadData() {
    // setCookie('clienToken', '', -1)
    localStorage.removeItem('client_csrf_token')

    document.getElementsByTagName('body')[0].classList.remove('sidebar-collapse')
  }
  async loadBusiness() {
    await this.props.loadPlanGroup()
    await this.props.loadBilling()
    await this.props.getGroupUsersCount()
    this.props.hasGroupAdmin(this.props.userData.id)
  }
  async loadData() {
    await this.props.loadCurrentUser()
    // if ([ADMIN.admincws, ADMIN.superadmin].includes(getUserRole(this.props.userData))) {
    if (isUserInRole(ADMIN.admincws, this.props.userData)) {
      this.props.loadHyps()
    }
    if (baseRoute.isBusiness && isUserInRole(ADMIN.groupadmin, this.props.userData)) {
      await this.loadBusiness()
    }
    changeBaseColor(siteConfig[siteConfig.key].baseColor)
    this.checkAdmin()

  }
  checkAuth() {
    console.log('ROLE', isUserInRole(ADMIN.authorization, this.props.userData), this.props.userData);
    if (
      this.props.pathname.includes(baseRoute.business) && !isUserInRole(ADMIN.groupadmin, this.props.userData)
      || this.props.pathname.includes(baseRoute.master) &&
      !(isUserInRole(ADMIN.admincws, this.props.userData) ||
        isUserInRole(ADMIN.authorization, this.props.userData) ||
        isUserInRole(ADMIN.invoice, this.props.userData) ||
        isUserInRole(ADMIN.admincfs, this.props.userData)
      )
    ) {
      if (this.props.pathname.includes(baseRoute.business) && !isUserInRole(ADMIN.groupadmin, this.props.userData)) {
        if (isUserInRole(ADMIN.enduser, this.props.userData)) {
          location.assign('/fm/cfs')
        } else if (isUserInRole(ADMIN.zerouser, this.props.userData) && !this.props.pathname.includes('dashboard')) {
          location.assign('/cadmin/dashboard')
        }
      }
      else {
        location.assign('/auth' + this.props.pathname)
      }
    }
  }
  checkAdmin() {
    console.log('checkAdmin', this.props);
    if (this.props.userData) {
      let pathname = this.props.pathname
      let route = pathname.split('/')[2]
      this.checkAuth()
      switch (route) {
        case '':
        case undefined:
          const { dispatch, getGroupUsersCount,
            planGroupData, billingData,
            userData, usersCount, } = this.props
          if (isUserInRole(ADMIN.admincws, userData)) {
            dispatch(push(`/${baseRoute.master}/hyps`))
          } else if (isUserInRole(ADMIN.admincfs, userData)) {
            dispatch(push(`/${baseRoute.master}/dashboard`))
          } else if (isUserInRole(ADMIN.groupadmin, userData)) {
            console.log('usersCount from props', usersCount);
            this.noPlan = planGroupData && Array.isArray(planGroupData) && !planGroupData.length
            if (this.noPlan) {
              dispatch(push(`/${baseRoute.business}/plan`))
            } else if (billingData && isArrayOK(billingData) && !billingData.filter(invoice => invoice.paid).length) {
              dispatch(push(`/${baseRoute.business}/invoices`))
            } else if (usersCount == 0) {
              dispatch(push(`/${baseRoute.business}/newuser`))
            } else if (usersCount > 0) {
              dispatch(push(`/${baseRoute.business}/users`))
            } else {
              dispatch(push(`/${baseRoute.business}/dashboard`))
            }
          }
          break;
      }
    } else {
      location.assign('/auth' + this.props.pathname)
    }
  }
  componentDidUpdate() {
    this.noPlan = this.props.planGroupData && Array.isArray(this.props.planGroupData) && !this.props.planGroupData.length
    // this.che ckAdmin()
  }
  togglepage = () => {
    let isPageCollapsed = document.getElementsByTagName('body')[0].classList.contains('sidebar-collapse');
    console.log('isPageCollapsed contains sidebar-collapse: ', isPageCollapsed);
    this.setState({ pageCollapsed: isPageCollapsed})
    // this.props.togglePage();
  }
  render() {
    console.log('App props : ', this.props.toggledPage)
    const { userData, userDataLoading, hypResources, hypsLoading,
      messageText, messageType,
      clearHyp, clearMessage,
      planGroupLoading, planGroupData,
      billingData, billingLoading, toggledPage
    } = this.props
    // const noInvoicePaid = billingData && Array.isArray(billingData) && !billingData.filter(invoice => invoice.paid).length
    // const noInvoicePaid = !userData || !userData.plan || !userData.plan.jsonInfo || JSON.parse(userData.plan.jsonInfo).type != 'business'
    const noInvoicePaid = !userData || !userData.lastPaidInvoice || userData.lastPaidInvoice.invoiceStatus != 'PAID'
    const sideBarProps = { userData, hypResources, hypsLoading, noInvoicePaid, planGroupData, toggledPage, pageCollapsed: this.state.pageCollapsed }
    const userProfileProps = { userData, userDataLoading }

    const showLanguage = language.key == 'fa' ? 'EN' : 'FA'
    const isfa = language.key == 'fa'

    const message = buildMessage(messageType, messageText)
    const handlers = { clearMessage, }
    const baseConfig = siteConfig[siteConfig.key]
    document.title = isfa ? ln('controlPanel') + ' ' + baseConfig.brand.fa
      : baseConfig.brand.en + ' ' + ln('controlPanel')
    const innerwrapperHeight = innerHeight
    const logoPgMargin = isfa ? '0px -20px 5px 7px' : '0px 7px 5px -20px'
    const styleType = baseRoute.isBusiness ? 'business' : 'master'

    return (
      <div className="wrapper">
        <Message message={message} handlers={handlers} />
        <header className="main-header">
          {/*<Link>hello</Link>*/}
          {/*<Link to={`/${baseRoute.active}`} className="logo">
            <span className="logo-mini">
              <img src={siteConfig.key != 'mtn' ?
                `/vm-admin-panel/design/dist/img/irancell-logo-${language.key}.jpg`
                : '/vm-admin-panel/design/dist/img/pg.png'
              }
                style={siteConfig.key != 'mtn' ? { height: 45 } : { height: 23 }} />
            </span>
            {siteConfig.key != 'mtn' ?
              <span className="logo-lg" style={{textAlign: isfa ? 'right':'left'}}>
                <img src={`/vm-admin-panel/design/dist/img/irancell-logo-${language.key}.jpg`} style={{ height: 45 }} />
              </span>
              :
              <span className="logo-lg">
                <img src='/vm-admin-panel/design/dist/img/pg.png'
                  style={{ height: 28, margin: logoPgMargin }} />
                {isfa ?
                  <span className="logo-pg-span-fa">
                    {baseConfig.faFirstPart}&zwnj;{baseConfig.faSecondPart}
                  </span>
                  :
                  <span><b>{baseConfig.bigFirstPart}</b>{baseConfig.bigSecondPart}</span>
                }
              </span>
            }
          </Link>*/}
          <nav className={`navbar navbar-static-top ${styleType}`}>


            <div className={`navbar-custom-menu ${language.key == 'en' ? 'pull-left' : 'pull-right'}`}>
              <ul className="nav navbar-nav">
                <li>
                  <a href="#" className={`sidebar-toggle ${styleType}`}
                    style={{ color: 'black' }}
                    data-toggle="offcanvas" role="button"
                    onClick={() => { this.togglepage() }}
                  >
                    <span className="sr-only">Toggle navigation</span>

                  </a>
                </li>
                <li>
                  <a href="/cadmin/dashboard">
                    {/*<i className="fas fa-tachometer-alt">dashboard</i>*/}
                    {/*<i className="fa fa-dashboard"></i>*/}
                    <img src={homePageIcon} alt="" style={{ width: '16px', height: '16px' }} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">

                <AppHeaderUserProfile {...userProfileProps} />
                <li>
                  <a data-toggle="control-sidebar" className={siteConfig.key == 'mtn' ? `header-txt` : 'en-font'}
                    onClick={() => userData && this.toggleLanguage(userData.id)}>
                    {showLanguage}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <aside className={`main-sidebar ${styleType}`} style={{ paddingTop: 0 }}>
          <section style={{ padding: '0px 1px 0 0', backgroundColor: siteConfig.key == 'mtn' ? '#ffcc00' : '#35B9FA', height: 49 }}>
            <Link to={`/${baseRoute.active}`} className="logo">
              {siteConfig.key == 'mtn' ?
                <span className="logo-lg" style={{ textAlign: isfa ? 'right' : 'left' }}>
                  <img src={`/vm-admin-panel/design/dist/img/irancell-logo-${language.key}.jpg`} style={{ height: 49 }} />
                </span>
                :
                <span className="logo-lg">
                  <img src='/vm-admin-panel/design/dist/img/pg.png'
                    style={{ height: 28, margin: logoPgMargin }} />
                  {isfa ?
                    <span className="logo-pg-span-fa">
                      {baseConfig.faFirstPart}&zwnj;{baseConfig.faSecondPart}
                    </span>
                    :
                    <span><b>{baseConfig.bigFirstPart}</b>{baseConfig.bigSecondPart}</span>
                  }
                </span>
              }
            </Link>
          </section>
        
          <section style={{ display: 'none', padding: '0px 1px 0 0', backgroundColor: siteConfig.key != 'mtn' ? '#373737' : '#35B9FA', height: 65 }}>
            <ul style={{ display: 'flex', listStyleType: 'none', color: 'white', paddingRight: 0, paddingLeft: language.key == 'en' ? 0 : '' }} >
              <li>
                <ul style={{ listStyleType: 'none', textAlign: 'center', paddingRight: '7px', margin: '8px 5px 5px 5px', paddingLeft: language.key == 'en' ? 0 : '' }}>
                  <li>Igmobile</li>
                  <li>
                    <hr style={{ marginTop: '4px', marginBottom: '4px', borderTop: '1px solid #ffcc00', width: '135px' }} />
                  </li>
                  <li>{userData && userData.username} {userData && userData.family}</li>
                </ul>
              </li>
              <li className="dropdown user user-menu">
                {/*<a href="#" className="dropdown-toggle" data-toggle="dropdown" style={siteConfig.key == 'mtn' ? { color: 'black', fontWeight: 'bold' } : {}}>
                  <img className="user-image" style={{ width: '60px', height: '60px' }} src={profileImage} alt="user image" />
                </a>*/}

                <a className="dropdown-toggle" type="button" data-toggle="dropdown">
                  {/*<img className="user-image" style={{ width: '60px', height: '60px' }} src={userData && `https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`} alt="user image" />*/}
                  <img className="user-image" style={{ width: '60px', height: '60px', marginRight: '14px' }} src={profileImage} alt="user image" />
                </a>


                <ul className="dropdown-menu open-toggle-profile" style={{ listStyleType: 'none' }}>
                  <li className="user-header" style={{ backgroundColor: '#ffcc00', marginTop: 0, paddingTop: 0 }}>

                    {/*<img src={userData && `https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`}
                      className="img-circle" alt="User Image" />*/}

                    <p style={{ padding: '10px', textAlign: 'center' }}>
                      <span className="en-font">{userData && userData.displayName}</span> -  Admin
              {userData && userData.lastPaidInvoice &&
                        <small>
                          {ln('membersince')}
                          &nbsp;
                  <span className="en-font">
                            {
                              new Date(userData.createdAt).toString().split(' ')[1] + '. '
                              + new Date(userData.createdAt).toString().split(' ')[3]
                            }
                          </span>
                        </small>
                      }
                      <small className="en-for-fa">{userData && userData.email}</small>
                    </p>
                  </li>

                  <li className="user-footer">
                    <div className={`pull-${dir('align')}`}>
                      <Link to={`/${baseRoute.active}/user/`} className="btn btn-default btn-flat">
                        {ln('profile')}
                      </Link>
                    </div>
                    <div className={`pull-${dir('reverseAlign')}`}>
                      <a href={`/auth/signout${location.pathname}`} className="btn btn-default btn-flat">{ln('signout')}</a>
                    </div>
                  </li>
                </ul>
                {/*                
                <ul class="dropdown-menu">
                  <li><a href="#">HTML</a></li>
                  <li><a href="#">CSS</a></li>
                  <li><a href="#">JavaScript</a></li>
                </ul>*/}
              </li>
            </ul>

          </section>
          <section className="sidebar">
            {userDataLoading == false ?
              userData ?
                <div className="user-panel" style={{ display: 'none' }} >
                  <div className="pull-left image">
                    <img src={userData && `https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`} className="img-circle" alt="User Image" />
                  </div>
                  <div className="pull-left info">
                    <p>
                      {userData && (userData.name && userData.family ? userData.name + ' ' + userData.family :
                        <span className="en-font">{userData.username}</span>)
                      }
                    </p>
                    <small><i className="fa fa-circle text-green"></i> {ln('online')} </small>
                  </div>
                </div>
                :
                <i />
              :
              <i className="fa fa-spin fa-circle-o-notch text-white" style={{ margin: 20, color: 'white' }} />
            }
            {/*<GeneralSearch />*/}

            <SideBar {...sideBarProps} />


          </section>
        </aside>

        <div className="content-wrapper bg-base-mtn" style={{ minHeight: innerwrapperHeight }}>
          {this.props.children}
        </div>
        <div className="control-sidebar-bg"></div>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const entities = baseRoute.isBusiness ? state.businessEntities : state.masterEntities
  const { hypResources, hypsLoading,
  } = state.masterEntities
  const { userData, userDataLoading,
    // messageText, messageType,
  } = state.generalEntities
  const { planGroupLoading, planGroupData, usersCount,
    billingData, billingLoading, toggledPage
  } = state.businessEntities
  const { messageText, messageType, } = entities
  const pathname = ownProps.location.pathname

  return {
    userData, userDataLoading, hypResources, hypsLoading,
    messageText, messageType,
    pathname,
    planGroupLoading, planGroupData, usersCount,
    billingData, billingLoading, toggledPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      loadCurrentUser, loadHyps, clearMessage, clearUser,
      loadBilling,
      clearHyp, changeLanguage,
      loadPlanGroup, hasGroupAdmin, getGroupUsersCount, togglePage
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
