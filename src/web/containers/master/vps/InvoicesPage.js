import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {
  loadInvoices, getvmOS,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
} from '../../../../actions'
import GeneralList from '../../../components/list/GeneralList'
import { siteConfig } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'

class InvoicesPage extends Component {
  componentDidMount() {
    this.props.getvmOS()
  }
  render() {
    const {
      invoicesLoading, count,
      dispatch, OSs, osLoading,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      loadInvoices,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
    } = this.props
    const listHandlers = {loadData: loadInvoices, next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams, }
    const searchSelectData = {
      paid: [{ name: 'Yes', value: true }, { name: 'No', value: false }],
      period: [{ name: 'month', value: 'MONTH' }, { name: '3 month', value: 'TMONTH' }, { name: '6 month', value: 'SMONTH' }, { name: 'year', value: 'YEAR' }],
      os: OSs && OSs.map(item => ({ name: item.displayName, value: item.name }))
    }
    const searchSelectLoading = { os: osLoading }
    const tableHeaders = [
      // 'refCode',
      'thVmName', 'thusername', 'thos', 'thstartdate', 'thenddate',
      'thpaid', 'thpaiddate', 'thperiod', 'thprice', 'thdiscount', 'thstatus',]
    const sortColumns = [
      // 'invoice.refCode',
      'vmBill.name', 'invoice.user.username', 'vmBill.os', 'invoice.from',
      'invoice.to', 'invoice.paid', 'invoice.approvedAt',
      'vmBill.lastInvoice.recurringPeriod', 'vmBill.lastInvoice.totalPrice',]
    let data = this.props.data
    const generalListProps = {
      isLoading: invoicesLoading, data, count,
      title: 'invoices', tableHeaders, sortColumns, listType: 'invoices', listHandlers,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      isSidebarCollapsed: true,
      searchItemDisplayName: 'vmName', searchItemType: 'vmBill.name',
      searchInnerForm: 'vmSearchInvoices',
      searchSelectData, searchSelectLoading,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('vpsInvoices')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li className="active">{ln('invoices')}</li>

          </ol>
        </section>

        <GeneralList {...generalListProps} />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    invoicesLoading, data, count, OSs, osLoading,
  } = state.masterEntities
  const { pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list
  return {
    invoicesLoading, data, count, OSs, osLoading,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      loadInvoices, getvmOS,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesPage)
