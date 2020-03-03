import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadVmBills, getvmOS,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
} from '../../../../actions'
import GeneralList from '../../../components/list/GeneralList'
import {baseRoute} from '../../../../utils/route'
import { siteConfig } from '../../../../utils/siteConfig'
import { language, ln, dir } from '../../../../utils/language'

class VmBillsPage extends Component {
  componentDidMount() {
    this.props.getvmOS()
  }

  render() {
    console.log('VmBillsPage props', this.props)
    const {
      vmbillsLoading,
      count,
      hypId, vmState,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      loadVmBills,
      OSs, osLoading,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
    } = this.props
    const listHandlers = {loadData: loadVmBills, dispatch, next, previous, setPage, changeSort,
      changePageSize, resetList, first, last,  setSearchParams, clearSearchParams,
    }
    // const stateColumn = hypId? 'VMState': 'vmbill'
    // const stateColumnSort = hypId? 'vm.state': 'vmBillStatus'
    const tableHeaders = ['thname', 'thos', 'thdisk', 'thram', 'thcpu',
    'thusername', 'thstartdate', 'thenddate', 'thvmstate', 'thvmbill', 'thpaid', 'thperiod', 'thprice', 'thsysname', 'thvm', 'thstatus']
    const sortColumns = ['name', 'os', 'primaryDisk', 'ram', 'cpuCores',
    'lastInvoice.user.username', 'lastInvoice.from', 'lastInvoice.to', 'vm.state',
    'vmBillStatus',
    'lastInvoice.paid', 'lastInvoice.recurringPeriod',
    'lastInvoice.totalPrice', 'vm.sysName',
    ]
    const searchSelectData = {
      paid: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      // payable: [{name: 'Yes', value: true}, {name: 'No', value: false}],
      vmState: [{name: 'ON'}, {name: 'OFF'}, {name: 'PROBLEM'}, {name: 'PAUSED'}, {name: 'DEFINED'}, {name: 'BUILT'}, {name: 'SUSPEND'}, ],
      period: [{name: 'month', value: 'MONTH'}, {name: '3 month', value: 'TMONTH'}, {name: '6 month', value: 'SMONTH'}, {name: 'year', value: 'YEAR'}],
      os: OSs && OSs.map(item => ({name: item.displayName, value: item.name}))
    }
    const searchSelectLoading = {os: osLoading}
    let data = this.props.data
    const hypName = hypId && data? data['name']: ''
    data = hypId?
      data? data.vmbills: null
      :
      data?data.vmbills? null: data: null
    const generalListProps = {isLoading: vmbillsLoading, data,
      count,
      title: 'vmOrders', tableHeaders, sortColumns, listType: 'vmBill',
      listHandlers,
      lastParams: {hypId, vmState},
      titleName: hypName,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      isSidebarCollapsed: true,
      searchItemDisplayName: 'name', searchItemType: 'name',
      searchInnerForm: 'searchVmBills',
      searchSelectData, searchSelectLoading,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('vpsOrders')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            {hypId && <li><Link to={`/${baseRoute.master}`}>{ln('hypervisor')}</Link></li>}
            {hypId && <li><Link to={`/${baseRoute.master}/hyp/${hypId}`}>{ln('hypervisorDetails')}</Link></li>}
            {hypId && <li className="active">{ln('hypervisorVPSOrders')}</li>}
            {!hypId && <li className="active"> {ln('vpsOrders')}</li>}

          </ol>
        </section>

        <GeneralList {...generalListProps} />

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {hypId, vmState} = ownProps.params
  const {
    vmbillsLoading, data,
    count, OSs, osLoading,
  } = state.masterEntities
  const {pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list
  return {
    vmbillsLoading, data,
    count, vmState,
    hypId, OSs, osLoading,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadVmBills, getvmOS,
    next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(VmBillsPage)
