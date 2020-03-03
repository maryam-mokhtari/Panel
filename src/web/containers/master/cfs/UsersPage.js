import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadUsers,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
} from '../../../../actions'
import {baseRoute} from '../../../../utils/route'
import GeneralList from '../../../components/list/GeneralList'
import { language, ln, dir, swip, } from '../../../../utils/language'
import { siteConfig, } from '../../../../utils/siteConfig'

class UsersPage extends Component {
  render() {
    console.log('UsersPage props', this.props)
    const {
      usersLoading, count,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      loadUsers,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
      params,
    } = this.props
    const { pageType } = params
    const listHandlers = {loadData: loadUsers, next, previous, setPage, changeSort, changePageSize,
      resetList, first, last, setSearchParams, clearSearchParams,
    }

    let tableHeaders = (pageType == 'business' || !pageType)?
    ['profileId', 'companyNationalCode', 'companyName',
    'thusername', swip('nationalId', 'cadmin'), swip('thname', 'cadmin'),
    'themail', 'thmobile', 'thusertype', 'registrationDate', 'status',]
    // 'thenabled', 'thauthorized',

    :pageType == 'individual'?
    ['profileId', 'thusername', 'themail', 'thenabled','thusertype', 'registrationDate',]

    :['thusername', 'thname', 'balance', 'themail', 'thmobile',
    'thenabled', 'thauthorized', 'thusertype', 'thcustomertype', 'thlanguage', 'registrationDate',]



    let sortColumns = (pageType == 'business' || !pageType)?
    ['id', 'profile.companyNationalCode', 'profile.company', 'username', 'profile.nationalId',
    'displayName', 'email', 'mobileNumber', 'groups', 'createdAt',]
    // 'enabled', 'authorized',

    :pageType == 'individual'?
    ['id', 'username', 'email', 'enabled', 'groups', 'createdAt',]

    :
    ['username', 'displayName', 'email',
    'mobileNumber',
    'enabled', 'authorized',
    'groups', 'profile.customerType', 'language.name', 'createdAt',]

    if (!pageType && siteConfig.key == 'pg') {
      tableHeaders.splice(2,0,'thbalance')
      sortColumns.splice(2,0,'balance')
    }
    let data = this.props.data
    console.log('sortColumn', sortColumn);
    const pagetitle = pageType == 'business'? 'businessUsers': pageType == 'individual'? 'individualUsers': !pageType? 'allUsers': 'users'
    const searchSelectData = {
      enabled: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      authorized: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      mobileVerified: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      customerType: [{name: 'Individual', value: 'individual'}, {name: 'Business', value: 'business'}]
    }
    const generalListProps = {isLoading: usersLoading, data, count,
      title: pagetitle, tableHeaders, sortColumns, listType: pagetitle, listHandlers,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      isSidebarCollapsed: true,
      searchItemDisplayName: 'username', searchItemType: 'username',
      searchInnerForm: (pageType == 'business' || !pageType)?'searchCadminUsers':pageType=='individual'?'searchEndUserUsers':'searchUsers',
      searchSelectData, lastParams: {pageType},
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln(pagetitle)}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li className="active"> {ln(pagetitle)}</li>

          </ol>
        </section>

        <GeneralList {...generalListProps} />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    usersLoading, data, count,
  } = state.masterEntities
  const {pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list

  console.log('state.list', state.list);
  return {
    usersLoading, data, count,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadUsers,
    next, previous, setPage, changeSort, changePageSize, resetList, first, last,
    setSearchParams, clearSearchParams,
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
