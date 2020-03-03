import React, {Component} from 'react'
import GeneralList from '../list/GeneralList'
import Loading from '../general/Loading'
import { language, ln, dir } from '../../../utils/language'

export default class UserInvoices extends Component {

  render() {
    const {userInvoicesData, userInvoicesCount,
      userId, userInvoicesLoading,
      dispatch, listHandlers,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    } = this.props
    let tableHeaders = ['thproductname', 'thcreatedate', 'thpaiddate', 'thstate', 'thprice',
      'thperiod', 'thpreSerial', 'thserial','thpayIdentifier', 'thpaid', '']

    const sortColumns = []
    const generalListProps = {
      isLoading: userInvoicesLoading,
      data: userInvoicesData, count: userInvoicesCount,
      tableHeaders, listType: 'userInvoices', listHandlers,
      dispatch,
      isHeaderAlreadyPrepared: true,
      isSearchHidden: true,
      isLoadOnClick: true,
      isSidebarCollapsed: false,
      pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams: {userId},
    }
    console.log('userInvoices listType', generalListProps.listType);
    return (
      <div id="productInvoices" className="tab-pane">
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
