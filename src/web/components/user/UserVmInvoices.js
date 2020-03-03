import React, {Component} from 'react'
import GeneralList from '../list/GeneralList'
import Loading from '../general/Loading'
import { language, ln, dir } from '../../../utils/language'

export default class UserVmInvoices extends Component {

  render() {
    const {userVmInvoicesData, userVmInvoicesCount, userId, userVmInvoicesLoading,
      dispatch, listHandlers,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    } = this.props
    const tableHeaders = [
      // 'threfCode', 
      'thvmname', 'thos', 'thstartdate', 'thenddate',
    'thpaid', 'thpaiddate', 'thperiod', 'thprice', 'thdiscount', 'thstatus', ]
    const sortColumns = []
    const generalListProps = {
      isLoading: userVmInvoicesLoading,
      data: userVmInvoicesData, count: userVmInvoicesCount,
      tableHeaders, listType: 'userVmInvoices', listHandlers,
      dispatch,
      isHeaderAlreadyPrepared: true,
      isSearchHidden: true,
      isLoadOnClick: true,
      // isDataSmall: true,
      isSidebarCollapsed: false,
      pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams: {userId},
    }
    return (
      <div id="vmInvoices" className="tab-pane">
        <div className="box user-profile-box">
          <div className="box user-box-body">
            <div className="box-body" style={{display: ''}}>
              <GeneralList {...generalListProps} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}
