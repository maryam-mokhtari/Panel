import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import Loading from '../../../components/general/Loading'
import { baseRoute } from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'
import { isUserInRole, getUserRole, ADMIN, } from '../../../../utils/role'
import { percentColor, changeBaseColor, } from '../../../../utils/color'
import { siteConfig, } from '../../../../utils/siteConfig'
import { isArrayOK } from '../../../../utils/array'
import profileImage from '../../../../../design/dist/img/mtn/profileImage.png'
// import profileImageSVG from '../../../../../design/dist/img/mtn/profileImage.svg'

export default class SideBar extends Component {
  render() {
    const treeContainer = `pull-${dir('reverseAlign')}-container`
    const treeIcon = `fa fa-angle-${dir('align')} pull-${dir('reverseAlign')}`
    // console.log('SideBar props:', this.props.pageCollapsed);
    const route = location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
    const { userData, hypsLoading, hypResources, noInvoicePaid, planGroupData, params, toggledPage } = this.props
    const hasPlan = isArrayOK(planGroupData) && userData.lastPaidInvoice
    // let isPageCollapsed = document.getElementsByTagName('body')[0].classList.contains('sidebar-collapse');
    // console.log('isPageCollapsed contains sidebar-collapse: ', isPageCollapsed);
    // console.log('header location.pathname sidebar togglepage action : ', isPageCollapsed, toggledPage, location.pathname);
    // console.log('SideBar role', userData, isUserInRole(ADMIN.groupadmin, userData, true));
    let isPageCollapsed = document.getElementsByTagName('body')[0].classList.contains('sidebar-collapse');
    console.log('sidebar isPageCollapsed : ', isPageCollapsed);
    return (
      <span>
        {baseRoute.isMaster &&
          <ul className="sidebar-menu">
            {(isUserInRole(ADMIN.admincws, userData) || isUserInRole(ADMIN.admincfs, userData)) &&
              <li className="header master">{ln('mainNavigation')}</li>
            }
            {(isUserInRole(ADMIN.admincws, userData) || isUserInRole(ADMIN.admincfs, userData)) &&
              siteConfig.key == 'pg' &&
              <li className={(route == 'all') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.master}/users/all`}>
                  <i className="fa fa-users"></i>
                  <span>{ln('allUsers')}</span>
                </Link>
              </li>
            }



            {(isUserInRole(ADMIN.admincfs, userData) || isUserInRole(ADMIN.authorization, userData)) &&

              <li className={`treeview ${(route == 'users' || route == 'business' || route == 'individual') && 'active'}`}>
                <a className={`slide-arrow-${language.key}`} href="#">
                  <i className="fa fa-ticket"></i> <span>{ln('users')}</span>
                  <span className={`${treeContainer} slide-span-${language.key}`}>
                    <i className={treeIcon}></i>
                  </span>
                </a>
                <ul className={`treeview-menu  treeview-menu-${language.key}`} style={{ paddingBottom: 10 }}>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/users`}>
                      <i className="fa fa-users"></i>
                      <span>{ln('allUsers')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/users/business`}>
                      <i className="fa fa-user-circle-o"></i>
                      <span>{ln('businessUsers')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/users/individual`}>
                      <i className="fa fa-user"></i>
                      <span>{ln('individualUsers')}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            }


            {isUserInRole(ADMIN.admincws, userData) &&
              <li className={(route == 'vmbills') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.master}/vmbills`}>
                  <i className="fa fa-shopping-basket"></i>
                  <span>{ln('vpsOrders')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.admincws, userData) &&
              <li className={(route == 'vminvoices') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.master}/vminvoices`}>
                  <i className="fa fa-file-text-o"></i>
                  <span>{ln('vpsInvoices')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.admincws, userData) &&
              <li className={(route == 'ips') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.master}/ips`}>
                  <i className="fa fa-globe"></i>
                  <span>{ln('iPAddresses')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.admincws, userData) &&
              <li className="treeview">
                <a className={`slide-arrow-${language.key}`} href="#">
                  <i className="fa fa-server"></i> <span>{ln('hypervisors')}</span>
                  <span className={`${treeContainer} slide-span-${language.key}`}>
                    <i className={treeIcon}></i>
                  </span>
                </a>
                <ul className={`treeview-menu treeview-menu-${language.key}`} style={{ paddingBottom: 10 }}>
                  {hypsLoading ?
                    <Loading />
                    :
                    hypResources ?
                      hypResources.hyps.sort((a, b) => a.name > b.name).map(hyp => {
                        return (
                          <li key={hyp.id}>
                            <Link to={`/${baseRoute.master}/hyp/${hyp['id']}`}
                              style={{ paddingLeft: 0 }}
                              className={`white-link text-${hyp['state'] == 'READY' ? 'green' : hyp['state'] == 'GONE' ? 'red' : 'orange'}`}>
                              {hyp.name}
                              <span className={treeContainer}>
                                <small data-original-title="DISK" data-toggle="tooltip" className={`label pull-right bg-${percentColor(hyp['usedDisk'], hyp['totalDisk'])}`}>{hyp.usedDisk}</small>
                                <small data-original-title="RAM" data-toggle="tooltip" className={`label pull-right bg-${percentColor(hyp['usedRam'], hyp['totalRam'])}`}>{hyp.usedRam}</small>
                                <small data-original-title="CPU" data-toggle="tooltip" className={`label pull-right bg-${percentColor(hyp['usedCpu'], 3 * hyp['totalCpu'])}`}>
                                  {hyp.usedCpu}
                                </small>

                              </span>
                            </Link>
                          </li>
                        )
                      })
                      :
                      <i />
                  }
                </ul>
              </li>
            }
            {isUserInRole(ADMIN.admincfs, userData) &&
              <li className={(route == 'groups') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.master}/groups`}>
                  <i className="fa fa-user-circle-o"></i>
                  <span>{ln('groups')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.admincfs, userData) &&
              <li className={(route == 'plans') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.master}/plans`}>
                  <i className="fa fa-ge"></i>
                  <span>{ln('plans')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.admincfs, userData) &&
              <li className={(route == 'charts') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.master}/charts`}>
                  <i className="fa fa-area-chart"></i>
                  <span>{ln('downloadUploadCharts')}</span>
                </Link>
              </li>
            }
            {(isUserInRole(ADMIN.admincfs, userData) || isUserInRole(ADMIN.invoice, userData)) &&
              <li className={`treeview ${(route == 'invoices' || route == 'draft' || route == 'pending' || route == 'reject') && 'active'}`}>
                <a className={`slide-arrow-${language.key}`} href="#">
                  <i className="fa fa-files-o"></i> <span>{ln('productInvoices')}</span>
                  <span className={`${treeContainer} slide-span-${language.key}`}>
                    <i className={treeIcon}></i>
                  </span>
                </a>
                <ul className={`treeview-menu  treeview-menu-${language.key}`} style={{ paddingBottom: 10 }}>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/invoices`}>
                      <i className="fa fa-file-text-o"></i>
                      <span>{ln('allInvoices')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/invoices/draft`}>
                      <i className="fa fa-file-o"></i>
                      <span>{ln('draftInvoices')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/invoices/pending`}>
                      <i className="fa fa-file-powerpoint-o"></i>
                      <span>{ln('pendingInvoices')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/invoices/reject`}>
                      <i className="fa fa-file-excel-o"></i>
                      <span>{ln('rejectInvoices')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="white-link" to={`/${baseRoute.master}/invoices/paid`}>
                      <i className="fa fa-file-archive-o"></i>
                      <span>{ln('paidInvoices')}</span>
                    </Link>
                  </li>
                </ul>
              </li>
            }
          </ul>
        }
        {baseRoute.isBusiness &&
          <ul className="sidebar-menu">

            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li>
                <Link to={``}
                  onClick={(e) => noInvoicePaid && e.preventDefault()}
                  className={`${noInvoicePaid ? 'disabled-link' : 'white-link'}`}>
                  <img className="img-circle" src={`https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`} alt="" data-toggle="dropdown" className="dropdown-toggle irancell-user-img"
                style={{ display: isPageCollapsed == false ? 'none' : '', width: '20px', height: '20px', margin: language.key == 'en' ? '0 8px 0px -3px' : '0 8px 0px 2px', borderRadius: '16px' }} />
                  <span>
                    <ul style={{ display: 'flex', listStyleType: 'none', color: 'white', paddingRight: 0, paddingLeft: language.key == 'en' ? 0 : '' }} >
                      <li>
                        <ul style={{ listStyleType: 'none', textAlign: 'center', paddingRight: '7px', margin: language.key == 'fa' ? '8px 5px 5px 5px' : '8px -6px 5px 5px', paddingLeft: language.key == 'en' ? 0 : '' }}>
                          <li>{userData && userData.profile.company}</li>
                          <li>
                            <hr style={{ marginTop: '4px', marginBottom: '4px', borderTop: '1px solid #ffcc00', width: '93px' }} />
                          </li>
                          <li>{userData && userData.username}</li>
                        </ul>
                      </li>
                      <li>
                        <img src={userData && `https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`} style={{ width: '60px', height: '60px' }}
                          className="img-circle irancell-user-img" alt="User Image" />
                      </li>
                    </ul>
                  </span>
                </Link>
              </li>
            }

            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li className="header business" style={{ display: '' }}>
                {ln('groupManagement')}
              </li>
            }
            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li className={(route == 'planInfo') && 'active'}>
                <Link to={`/${baseRoute.business}/planInfo`}
                  onClick={(e) => noInvoicePaid && e.preventDefault()}
                  className={`${noInvoicePaid ? 'disabled-link' : 'white-link'}`}>
                  <i className="fa fa-life-ring"></i>
                  <span>{ln('planInfo')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li className={(route == 'plan') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.business}/plan`}>
                  <i className={`fa fa-${hasPlan ? 'level-up' : 'shopping-cart'}`}></i>
                  <span>{ln(hasPlan ? 'upgradePlan' : 'buyPlan')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li className={(route == 'newuser') && 'active'}>
                <Link to={`/${baseRoute.business}/newuser`}
                  onClick={(e) => noInvoicePaid && e.preventDefault()}
                  className={`${noInvoicePaid ? 'disabled-link' : 'white-link'}`}>
                  <i className="fa fa-user-o"></i>
                  <span>{ln('addNewUser')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li className={(route == 'users') && 'active'}>
                <Link to={`/${baseRoute.business}/users`}
                  onClick={(e) => noInvoicePaid && e.preventDefault()}
                  className={`${noInvoicePaid ? 'disabled-link' : 'white-link'}`}>
                  <i className="fa fa-users"></i>
                  <span>{ln('users')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li className={(route == 'charts') && 'active'}>
                <Link to={`/${baseRoute.business}/charts`}
                  onClick={(e) => noInvoicePaid && e.preventDefault()}
                  className={`${noInvoicePaid ? 'disabled-link' : 'white-link'}`}>
                  <i className="fa fa-area-chart"></i>
                  <span>{ln('downloadUploadCharts')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.groupadmin, userData) &&
              <li className={(route == 'invoices') && 'active'}>
                <Link className="white-link" to={`/${baseRoute.business}/invoices`}>
                  <i className="fa fa-file-text-o"></i>
                  <span>{ln('invoices')}</span>
                </Link>
              </li>
            }
            {isUserInRole(ADMIN.enduser, userData) &&
              <li>
                <a href="/fm/cfs/"
                  onClick={(e) => noInvoicePaid && e.preventDefault()}
                  target={!noInvoicePaid && '_blank'}
                  className={`${noInvoicePaid ? 'disabled-link' : 'white-link'}`}>
                  <i className="fa fa-cloud-download"></i>
                  <span>{ln('cfs')}</span>
                </a>
              </li>
            }
            <li className={(route == 'about') && 'active'}>
              <Link className="white-link" to={`/${baseRoute.business}/about`}>
                <i className="fa fa-info"></i>
                <span>{ln('aboutus')}</span>
              </Link>
            </li>
          </ul>
        }
      </span>
    )
  }
}
