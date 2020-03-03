import React, {Component} from 'react'
import GeneralList from '../../list/GeneralList'
import Loading from '../../general/Loading'
import {loadBox} from '../../../../utils/box'
import { language, ln, dir } from '../../../../utils/language'

export default class VMInvoices extends Component {
  render() {
    const {vmInvoices, vmbillId, vmInvoicesLoading, listHandlers, vmbillName,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, updateinvoiceLoading,
    } = this.props
    const tableHeaders = ['thfrom', 'thto', 'thcreated', 'thpaid', 'thprice', 'thpayable', 'thpaid', 'thstatus']
    const sortColumns = []//'from', 'to', 'createdAt', 'approvedAt', 'payablePrice', 'totalPrice', 'payable', 'paid']
    const generalListProps = {isLoading: vmInvoicesLoading, data: vmInvoices, count: vmInvoices? vmInvoices.length: 0,
      tableHeaders, sortColumns, listType: 'vmInvoice', listHandlers,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending,
      isHeaderAlreadyPrepared: true,
      isSearchHidden: true,
      isLoadOnClick: true,
      isDataSmall: true,
      isSidebarCollapsed: false,
    }

    return (
      <div className="box collapsed-box">
        <div className="box-header">
          <h3 className="box-title box-name-collapse" data-widget="collapse"
            style={{cursor: 'pointer'}}
            onClick={() => loadBox(this.refs, true, listHandlers.loadData, vmbillId)}>{ln('invoices')} &nbsp;

          </h3>
          <a href="#"
            disabled={updateinvoiceLoading}

            className="product-title side-button" data-toggle="modal" data-target={!updateinvoiceLoading && '.updateVmInvoice'}>
            <span className="label label-warning box-button" > {ln('updateLastInvoice')}
              &nbsp;
              {updateinvoiceLoading?
                <i className="fa fa-spin fa-circle-o-notch" />
                :
                <i className="fa fa-pencil" />
              }
            </span>
          </a>
          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool" data-widget="collapse"
              onClick={() => loadBox(this.refs, false, listHandlers.loadData, vmbillId)}>
              <i ref="collapseBtn" className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="box-body" style={{display: 'none'}}>
          <GeneralList {...generalListProps} />
        </div>

      </div>
    )
  }
}
