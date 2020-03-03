import React, {Component} from 'react'
import GeneralList from '../list/GeneralList'
import { language, ln, dir } from '../../../utils/language'
import Loading from '../general/Loading'

export default class UserIPHistories extends Component {

  render() {
    const {
      userIPHistoriesData, userIPHistoriesCount,
      userId, userIPHistoriesLoading,
      dispatch, listHandlers,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    } = this.props
    const tableHeaders = ['thIP', 'thVmName', 'thcpu', 'thram', 'disk', 'thos', 'thstartdate', 'thenddate', 'thperiod', 'thprice', 'thpaid', 'thvm', 'thactive', 'thstatus']
    const sortColumns = []
    const generalListProps = {
      isLoading: userIPHistoriesLoading ,
      data: userIPHistoriesData,
      count: userIPHistoriesCount,
      tableHeaders, listType: 'userIPHistories', listHandlers,
      dispatch,
      isHeaderAlreadyPrepared: true,
      isSearchHidden: true,
      isLoadOnClick: true,
      // isDataSmall: true,
      isSidebarCollapsed: false,
      pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams: {userId},
    }
    console.log('userIPHistories props', this.props);
    return (
      <div id="ipHistories" className="tab-pane">
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
