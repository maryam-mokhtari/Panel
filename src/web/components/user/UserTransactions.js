import React, {Component} from 'react'
import GeneralList from '../list/GeneralList'
import FormGeneratorModal from '../general/FormGeneratorModal'
import Loading from '../general/Loading'
import {loadBox,} from '../../../utils/box'
import {getNormalizedDigit, } from '../../../utils/normalize'
import { clearFormGeneratorModal, } from '../../../utils/form'
import { language, ln, dir } from '../../../utils/language'

export default class UserTransactions extends Component {
  render() {
    const {userTransactionsData, userTransactionsCount, userId, userTransactionLoading, userTransactionsHandlers,
      dispatch,
      updateBalanceLoading,
      handlers, user,
      listHandlers, loadDatas,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
    } = this.props

    const tableHeaders = ['thsource', 'thdestination', 'thtype', 'thdeposit', 'thwithdraw', 'thcreatedate', 'thdescription']
    const sortColumns = []
    const generalListProps = {isLoading: userTransactionLoading, data: userTransactionsData, count: userTransactionsCount,
      tableHeaders, listType: 'userTransactions', listHandlers,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams: {userId},
      isHeaderAlreadyPrepared: true,
      isSearchHidden: true,
      isLoadOnClick: true,
      // isDataSmall: true,
      isSidebarCollapsed: false,
    }
    let userBalance = user[0].balance * 10000

    let updateBalanceProps = {
      defaultValues: {defaultBalance: userBalance},
    }
    return (
      <div id="transactions" className="tab-pane">
        <div className="box user-profile-box">
          <div className="box user-box-body">
            <div style={{paddingTop: '20px'}} className="box-header">
              <a href="#"
                disabled={updateBalanceLoading}
                onClick={() => clearFormGeneratorModal()}
                className="product-title" data-toggle="modal" data-target={!updateBalanceLoading && '.updateBalance'}>
                <span className="label label-warning box-button" style={{ marginLeft: 10 }}> {ln('updateBalance')}
                  &nbsp;
                  {updateBalanceLoading?
                    <i className="fa fa-spin fa-circle-o-notch" />
                    :
                    <i className="fa fa-pencil" />
                  }
                </span>
              </a>
            </div>
            <div className="box-body" style={{display: ''}}>
              <GeneralList {...generalListProps} />
            </div>


          </div>

          <FormGeneratorModal buttonText='modalTitleUpdateBalance' iconName="pencil" innerForm="updateBalance"
            submitAction={handlers.updateBalance} params={[userId]}
            {...updateBalanceProps}
            />
        </div>
      </div>

    )
  }
}
