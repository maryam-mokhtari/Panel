import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadGroups,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
} from '../../../../actions'
import GeneralList from '../../../components/list/GeneralList'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'
import { siteConfig, } from '../../../../utils/siteConfig'
import {isUserInRole, getUserRole, ADMIN}  from '../../../../utils/role'

class GroupsPage extends Component {

  render() {
    const {
      userData,
      groupsLoading,
      count,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      loadGroups,
      data,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
    } = this.props
    const listHandlers = {loadData: loadGroups, dispatch, next, previous, setPage, changeSort,
      changePageSize, resetList, first, last,  setSearchParams, clearSearchParams, }
      const tableHeaders = ['thgroupname', 'thmembercount', 'thplanname', 'thadminname', 'thquota',
      'thinvoices'
    ]
    const sortColumns = ['groupName', 'memberCount', 'plan.name', 'adminUser.username']
    const searchSelectData = {
      period: [{name: 'month', value: 'MONTH'}, {name: '3 month', value: 'TMONTH'}, {name: '6 month', value: 'SMONTH'}, {name: 'year', value: 'YEAR'}],
    }

    const generalListProps = {isLoading: groupsLoading, data,
      count,
      title: 'groups', tableHeaders, sortColumns, listType: 'groups',
      listHandlers,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      isSidebarCollapsed: true,
      searchItemDisplayName: 'groupName', searchItemType: 'groupName',
      searchInnerForm: 'searchGroups',
      searchSelectData,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('groups')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li className="active"> {ln('groups')}</li>

          </ol>
          {isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData) &&
            <div className="row">
              <div className="col-md-6" style={{paddingTop: 10}}>
                <Link role="button" className="btn btn-default white-button"
                  to={`/${baseRoute.master}/group`}>
                  <span>{ln('addGroup')} &nbsp;</span>
                  <i className="fa fa-plus-circle"></i>

                </Link>
              </div>
            </div>
          }
        </section>

        <GeneralList {...generalListProps} />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    groupsLoading, data,
    count,
  } = state.masterEntities
  const {userData, userDataLoading} = state.generalEntities
  const {pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list
  return {
    userData, userDataLoading,
    groupsLoading, data,
    count,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadGroups,
    next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage)
