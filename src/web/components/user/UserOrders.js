import React, {Component} from 'react'
import GeneralList from '../list/GeneralList'
import { language, ln, dir } from '../../../utils/language'
import Loading from '../general/Loading'

export default class UserOrders extends Component {

  render() {
    const {
      userOrdersData, userOrdersCount,
      userId, userOrdersLoading,
      dispatch, listHandlers,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    } = this.props
    const tableHeaders = ['thname', 'thos', 'thdisk', 'thram', 'thcpu', 'thstartdate', 'thenddate', 'thvmstate', 'thvmbill', 'thpaid', 'thperiod', 'thprice', 'thsysname',  'thvm', 'thstatus',]
    const sortColumns = []
    const generalListProps = {
      isLoading: userOrdersLoading,
      data: userOrdersData,
      count: userOrdersCount,
      tableHeaders, listType: 'userOrders', listHandlers,
      dispatch,
      isHeaderAlreadyPrepared: true,
      isSearchHidden: true,
      isLoadOnClick: true,
      // isDataSmall: true,
      isSidebarCollapsed: false,
      pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams: {userId},
    }
    return (
      <div id="vpsOrders" className="tab-pane">
        <div className="box user-profile-box">
          <div className="box user-box-body">
            <div className="box-body">
              <GeneralList {...generalListProps} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}
