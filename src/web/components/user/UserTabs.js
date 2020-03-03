import React, { Component } from 'react'
import {language, ln, dir} from '../../../utils/language'
import { siteConfig } from '../../../utils/siteConfig'

export default class UserTabs extends Component {
  render() {
    const {tabsHandlers, baseColor, isUserCwsAdmin, isUserCfsAdmin, isMainAdmin, isGroupAdmin,
      isAuthorizationAdmin, isInvoiceAdmin,
      pageNumber, pageSize, sortColumn, isAscending, searchParams, userId, isOwnPage,
    } = this.props
    const {loadUserAuthorization, getAuthorizationDocuments, loadUserTransactions,
      loadUserVmInvoices, loadUserOrders, loadUserIPHistories, loadUserInvoices,
      setAuthDocStatus, authDocStatus,
      loadUserPlan, loadUserUsers,
    } = tabsHandlers
    console.log('UserTabs props', this.props);
    const iconColor = `text-${baseColor}`
    return (
      <ul className={`nav nav-tabs user-nav-tabs user-nav-tabs-${baseColor} bg-${baseColor}`}>
        <li className="active">
          <a data-toggle="tab" href="#about">{ln('about')}</a>
          <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
          <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
        </li>
        {(isMainAdmin || isAuthorizationAdmin) && !isOwnPage &&
          <li>
            <a onClick={() => {
                loadUserAuthorization(userId)
                getAuthorizationDocuments(userId)
                authDocStatus(userId)
              }} data-toggle="tab" href="#authorization" >{ln('userAuthorization')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {siteConfig.key != 'mtn' && isMainAdmin && !isOwnPage &&
          <li>
            <a onClick={() => {
                loadUserTransactions(pageNumber, pageSize, sortColumn, isAscending, searchParams, {userId})
              }
            } data-toggle="tab" href="#transactions">{ln('transactions')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {isUserCwsAdmin && !isOwnPage &&
          <li>
            <a onClick={() => {
                loadUserVmInvoices(pageNumber, pageSize, sortColumn, isAscending, searchParams, {userId})
              }}
              data-toggle="tab" href="#vmInvoices">{ln('vpsInvoices')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {isUserCwsAdmin && !isOwnPage &&
          <li>
            <a onClick={() => {
                loadUserOrders(pageNumber, pageSize, sortColumn, isAscending, searchParams, {userId, })
              }}
              data-toggle="tab" href="#vpsOrders">{ln('vpsOrders')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {isUserCwsAdmin && !isOwnPage &&
          <li>
            <a onClick={() => {
                loadUserIPHistories(pageNumber, pageSize, sortColumn, isAscending, searchParams, {userId, })
              }}
              data-toggle="tab" href="#ipHistories">{ln('ipHistories')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {(isMainAdmin || isInvoiceAdmin) && !isOwnPage &&
          <li>
            <a onClick={() => {
                loadUserInvoices(pageNumber, pageSize, sortColumn, isAscending, searchParams, {userId})
              }}
              data-toggle="tab" href="#productInvoices">{ln('productInvoices')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {isUserCfsAdmin && !isOwnPage &&
          <li>
            <a onClick={() => {
                loadUserPlan(userId)
              }}
              data-toggle="tab" href="#UserPlan">{ln('planInfo')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {isUserCfsAdmin && !isOwnPage &&
          <li>
            <a onClick={() => {
              loadUserUsers(pageNumber, pageSize, sortColumn, isAscending, searchParams, {userId})
              }}
              data-toggle="tab" href="#UserUsers">{ln('UserUsers')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }
        {(isOwnPage || isGroupAdmin) &&
          <li>
            <a data-toggle="tab" href="#changePassword">{ln('changePassword')}
            </a>
            <i className={`fa fa-caret-up up md-hide ${iconColor}`} />
            <i className={`fa fa-caret-right right sm-show ${iconColor}`} />
          </li>
        }

      </ul>
    )
  }
}
