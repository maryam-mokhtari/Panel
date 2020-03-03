import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { push } from 'react-router-redux'
import {
  loadCFSInvoices,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
} from '../../../../actions'
import GeneralList from '../../../components/list/GeneralList'
import { siteConfig, } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir, swip, } from '../../../../utils/language'

class InvoicesPage extends Component {
  exportFile(from, to) {
    from = new Date(from).getTime()
    to = new Date(to).getTime()
    window.open(location.origin +
    `/cfs/rest/admin/getRevenuesReport?from=${from}&to=${to}`, '_blank')
  }
  getTitle(status) {
    return status == 'all'? ln('all') + ' ' + ln('invoices'): swip('invoicesOf', status)
  }
  render() {
    console.log('Invoicespage', this.props)
    const {
      cfsInvoicesLoading, count,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      loadCFSInvoices,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
      userId,
    } = this.props

    let status = this.props.status || 'all'
    const listHandlers = {
      loadData: loadCFSInvoices, exportFile: this.exportFile,
      next, previous, setPage, changeSort, changePageSize,
      resetList, first, last, setSearchParams, clearSearchParams,
    }

    let tableHeaders = ['thproductname', 'thusername', 'thcreatedate', 'thpaiddate', 'thstate', 'thprice', 'thperiod', 'thpreSerial', 'thserial', 'thpayIdentifier', ]
    let sortColumns = ['product.name', 'user.username', 'invoiceStatus', 'approvedAt', 'createdAt', 'totalPrice', 'recurringPeriod', 'preInvoiceSerial', 'serial', 'payIdentifier',]
    if (status == 'pending') {
    } else {
      tableHeaders = [...tableHeaders, 'thpaid',]
      sortColumns = [...sortColumns, 'paid',]
    }
    tableHeaders = [...tableHeaders, ' ',]

    let data = this.props.data
    if (status == 'pending' && data) {
      data = data.filter(item => item.trackDate)
    }
    const searchSelectData = {
      paid: [{ name: 'Yes', value: true }, { name: 'No', value: false }],
      period: [{ name: 'month', value: 'MONTH' }, { name: 'tmonth', value: 'TMONTH' }, { name: 'smonth', value: 'SMONTH' }, { name: 'year', value: 'YEAR' }],
      invoiceStatus:[{name: 'paid', value: 'PAID'}, {name: 'pending', value: 'PENDING'},
      // {name: 'upgrade', value: 'UPGRADE'},
        {name: 'draft', value: 'DRAFT'},
      // {name: 'cancel', value: 'CANCEL'},
        {name: 'reject', value: 'REJECT'}, ]
    }
    let generalListProps = {
      isLoading: cfsInvoicesLoading, data, count,
      title: `${this.getTitle(status)}
        ${data && data.length && userId? ' ' + ln('of') + ' ' + data[0].user.username : ''}`,
      tableHeaders, sortColumns, listType: 'cfsInvoices', listHandlers,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      isSidebarCollapsed: true,
      searchItemDisplayName: 'preInvoiceSerial', searchItemType: 'preInvoiceSerial',
      searchInnerForm: 'searchCFSInvoices',
      searchSelectData,
      lastParams: { status, userId },
      isExportFile: true,
    }
    if (status == 'pending') {
      generalListProps = { ...generalListProps, searchItemDisplayName: 'payIdentifier', searchItemType: 'payIdentifier', }
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('productInvoices')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li className="active">{this.getTitle(status)}</li>
          </ol>
        </section>
        <GeneralList {...generalListProps} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    cfsInvoicesLoading, data, count,
  } = state.masterEntities
  const { pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list
  const { status, userId, } = ownProps.params
  return {
    cfsInvoicesLoading, data, count,
    // isExportFileLoading,
    status, userId,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      loadCFSInvoices,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last,
      setSearchParams, clearSearchParams,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesPage)
