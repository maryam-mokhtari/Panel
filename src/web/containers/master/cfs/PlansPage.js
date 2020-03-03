import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadProducts, loadUser,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
} from '../../../../actions'
import GeneralList from '../../../components/list/GeneralList'
import { siteConfig } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'
import {isUserInRole, getUserRole, ADMIN}  from '../../../../utils/role'


class PlansPage extends Component {
  render() {
    console.log('ADMIN.admincfs', ADMIN, ADMIN.admincfs);
    const {
      productsLoading, count,
      addEditProductLoading,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      loadProducts, userData,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
    } = this.props
    const listHandlers = {loadData: loadProducts, next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams, }
    let searchSelectData = {
      active: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      defaultPlan: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      uiVisible: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      // category: [{name: 'CWS'}, {name: 'CWS_HOST'}, {name: 'CFS'}, {name: 'CDN'}, {name: 'HOST'}, {name: 'CFS_BUSINESS'}, {name: 'DLC'}, {name: 'DOMAIN'},],
    }
    /*
    if (userData) {
      userRole = getUserRole(userData)
      if (userRole == ADMIN.admincfs) {
        searchSelectData.category = [{name: 'CFS'}, {name: 'HOST'}, {name: 'CFS_BUSINESS'}, {name: 'DOMAIN'},]
      }
      if (userRole == ADMIN.admincws) {
        searchSelectData.category = [{name: 'CWS'}, {name: 'CWS_HOST'},]
      }
    }*/
    const tableHeaders = ['thname', 'thcategory', 'thdefault', 'thuiVisible', 'thactive']
    const sortColumns = ['name', 'category', 'defaultPlan', 'uiVisible', 'active']
    let data = this.props.data

    const generalListProps = {isLoading: productsLoading, data, count,
      title: 'plans', tableHeaders, sortColumns, listType: 'products', listHandlers,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      isSidebarCollapsed: true,
      searchItemDisplayName: 'planName', searchItemType: 'name',
      searchInnerForm: 'searchProducts',
      searchSelectData,
      lastParams: {role: siteConfig[siteConfig.key].role},
      userData,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('plans')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li className="active">{ln('plans')}</li>
          </ol>
          {isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData) &&
            <div className="row">
              <div className="col-md-6" style={{paddingTop: 10}}>
                <Link role="button" className="btn btn-default white-button"
                  to={`/${baseRoute.master}/plan`}>
                  <span>{ln('addPlans')} &nbsp;</span>
                  <i className="fa fa-plus-circle"></i>
                </Link>
              </div>
              <div className="col-md-6">
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
    productsLoading, data, count,
  } = state.masterEntities
  const {userData, userDataLoading} = state.generalEntities
  const {pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list
  return {
    userData,
    productsLoading, data, count,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadProducts, loadUser,
    next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansPage)
