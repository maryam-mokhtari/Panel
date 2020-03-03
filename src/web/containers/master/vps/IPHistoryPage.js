import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadIPHistory, resetList,
} from '../../../../actions'

import GeneralList from '../../../components/list/GeneralList'
import { siteConfig } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'

class IPHistoryPage extends Component {
  componentDidMount() {
    this.props.loadIPHistory(this.props.ip)
  }
  nullFunc() {

  }
  render() {
    const {
      ipHistoryLoading,
      data,
      ip,
      dispatch,
      loadIPHistory,
    } = this.props
    const listHandlers = {loadData: this.nullFunc, resetList, }
    const tableHeaders = ['thusername', 'thVmName', 'thcpu', 'thram', 'thdisk', 'thos', 'thstartdate', 'thenddate', 'thperiod', 'thprice', 'thpaid', 'thvm', 'thactive', 'thstatus']

    const generalListProps = {isLoading: ipHistoryLoading, data, tableHeaders, listType: 'ipHistory',
      isSearchHidden: true, isDataSmall: true,
      listHandlers,
      titleName: ip,
      dispatch,
      isSidebarCollapsed: false,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('ipHistoryOrders')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/ips`}>{ln('ips')}</Link></li>
            <li className="active">{ln('ipHistoryOrders')}</li>
          </ol>
        </section>
        <GeneralList {...generalListProps} />
      </div>


    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ip} = ownProps.params
  const {
    ipHistoryLoading, data,
  } = state.masterEntities
  return {
    ipHistoryLoading, data,
    ip: ip.replace(/-/g,'.')

  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadIPHistory, resetList,
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(IPHistoryPage)
