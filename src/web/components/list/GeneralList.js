import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListHeader from './ListHeader'
import { listConstants } from '../../../utils/list'
import { clearFormGeneratorModal, } from '../../../utils/form'
import {language, ln, dir} from '../../../utils/language'
import { isArrayOK } from '../../../utils/array'
import FormGeneratorModal from '../general/FormGeneratorModal'
import TR from '../general/TR'
import Loading from '../general/Loading'

export default class GeneralList extends Component {
  constructor(props) {
    super(props)
  }
  async loadData() {

    const { listHandlers,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      lastParams,
      isHeaderAlreadyPrepared, } = this.props
      await listHandlers.loadData(pageNumber, pageSize, sortColumn, isAscending, searchParams, lastParams)
  }
  componentDidMount() {
    this.preLoadData()
  }
  componentDidUpdate(nextProps) {
    const { listType, lastParams, data, } = this.props
    // if (listType == 'vmBill' && lastParams.hypId != nextProps.lastParams.hypId
    //   || listType == 'cfsInvoices' && lastParams.status != nextProps.lastParams.status
    // ) {
    //   this.preLoadData()
    // }
    if (nextProps.data && !data) {
      this.preLoadData()
    }
  }
  async preLoadData() {
    if (this.props && this.props.listHandlers) {
      await this.props.listHandlers.resetList()
    }
    if (!this.props.isLoadOnClick) {
      this.loadData()
    }
    if (this.props.isSidebarCollapsed) {
      document.getElementsByTagName('body')[0].classList.add('sidebar-collapse')
    } else {
      document.getElementsByTagName('body')[0].classList.remove('sidebar-collapse')
    }
  }
  async first() {
    await this.props.listHandlers.first()
    this.loadData()
  }
  async last() {
    await this.props.listHandlers.last(this.props.count)
    this.loadData()
  }
  async next() {
    await this.props.listHandlers.next()
    this.loadData()
  }
  async previous() {
    await this.props.listHandlers.previous()
    this.loadData()
  }
  async setPage(pageNumber) {
    await this.props.listHandlers.setPage(pageNumber)
    this.loadData()
  }
  async changeSort(sortColumn, isAscending) {
    await this.props.listHandlers.changeSort(sortColumn, isAscending)
    this.loadData()
  }

  render() {
    console.log('Generallist props : ', this.props)
    const {
      isLoading, count, data,
      title, tableHeaders, sortColumns, listType,
      titleName, isSearchHidden, isHeaderAlreadyPrepared, isDataSmall,
      listHandlers, trHandlers, trLoadings,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      dispatch, lastParams,
      searchItemDisplayName, searchItemType,
      searchInnerForm, searchSelectData, searchSelectLoading,
      isExportFile,
    } = this.props


    const pagesCount = Math.ceil(count / pageSize)
    const isPrevious = pageNumber > 1
    const isNext = pageNumber < pagesCount
    const listHeaderProps = {
      pageNumber, pageSize, sortColumn, isAscending, searchParams, listHandlers,
      searchItemDisplayName, searchItemType, lastParams,
      searchInnerForm, isLoading, searchSelectData, searchSelectLoading,

    }
    const align =  dir('align')
    const reverseAlign = dir('reverseAlign')

    const firstLastLocale = {right:ln('last'), left:ln('first')}
    const previousNextLocale = {right:ln('next'), left:ln('previous')}
    const ispreviousNext = {right:isNext, left:isPrevious}
    const firstLast = {right: this.last, left: this.first}
    return (
      <section className={!isHeaderAlreadyPrepared && 'content'}>

        <div className={!isHeaderAlreadyPrepared && 'row'}>
          <div className={!isHeaderAlreadyPrepared && 'col-xs-12'}>
            <div className={!isHeaderAlreadyPrepared && 'box'}>
              {!isHeaderAlreadyPrepared &&
                <div className="box-header" style={{ paddingBottom: 0 }}>
                  <h3 className="box-title"><span style={{ fontWeight: 600 }}>{titleName}</span> &nbsp;
                    {ln(title)}</h3>
                  {isExportFile && false &&
                    <button type="button" className="btn btn-success export sm-hide"
                      data-toggle="modal" data-target=".exportFile"
                      onClick={() => clearFormGeneratorModal()}
                      >
                      <span>{ln('revenueReport')} &nbsp;</span>
                      <i className="fa fa-file-excel-o"></i>
                    </button>
                  }
                </div>
              }

              <div className="box-body">
                <div className="dataTables_wrapper form-inline dt-bootstrap">
                  {!isSearchHidden &&
                    <ListHeader {...listHeaderProps} />
                  }

                  {isLoading ?
                    <Loading />
                    :
                    isArrayOK(data)?
                    <div>
                      <div className="row" style={{fontSize: '0.9em'}}>
                        <div className="col-sm-12" style={{ overflowX: 'auto' }}>
                          <table className={`table table-striped responsive-${language.key}-table`}>
                            <thead>
                              <tr role="row">

                                <th>
                                  {ln("number")}
                                </th>
                                {tableHeaders.map((headerName, index) =>
                                  <th key={index}>
                                    {ln(headerName)}
                                    {/*{headerName && language.key == 'fa' ? (headerName) : (headerName && headerName[0].toString().toUpperCase() + headerName.substr(1))}*/}
                                    <br />
                                    {sortColumns && sortColumns.length > index &&
                                      <i className="fa fa-long-arrow-up text-gray sort" style={
                                          sortColumn == sortColumns[index] && isAscending == false ?
                                          { cursor: 'default', color: '#00c0ef !important' }
                                          :
                                          { cursor: 'pointer', }
                                        }
                                        onClick={() =>
                                          (sortColumn != sortColumns[index] || isAscending != false) &&
                                          this.changeSort(sortColumns[index], false)}
                                      />
                                    }
                                    {sortColumns && sortColumns.length > index &&
                                      <i className="fa fa-long-arrow-down text-gray sort" style={
                                          sortColumn == sortColumns[index] && isAscending == true ?
                                          { cursor: 'default', color: '#00c0ef !important' }
                                          :
                                          { cursor: 'pointer', }
                                        }
                                        onClick={() =>
                                          (sortColumn != sortColumns[index] || isAscending != true) &&
                                          this.changeSort(sortColumns[index], true)}
                                      />
                                    }
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {
                                data.map((item, index) => {
                                  const dataTrProps = { item, pageNumber, pageSize, index, dispatch, lastParams,
                                    listType, trHandlers, trLoadings, }
                                    return <TR key={index} {...dataTrProps} />
                                })
                              }
                            </tbody>

                          </table>
                        </div>
                      </div>
                      {!isDataSmall &&

                        <div className="row">
                          <div className="col-sm-5">
                            <div className="dataTables_info" role="status" aria-live="polite">
                              {count ?
                                <span>{ln('showing')} <b>{(pageNumber - 1) * pageSize + 1}</b> {ln('to')}&nbsp;
                                  <b>{pageNumber * pageSize < count ? pageNumber * pageSize : count}</b>
                                  &nbsp;
                                  {ln('of')} <b>{count}</b> {ln('entries')}
                                </span>
                                :
                                <span />
                              }
                            </div>
                          </div>
                          <div className="col-sm-7">
                            <div className={`dataTables_paginate paging_simple_numbers pull-${dir('reverseAlign')}`}>
                              <ul className="pagination" style={{direction: 'ltr'}}>
                                <li className={`paginate_button ${!ispreviousNext[align] && 'disabled'}`} >
                                  <a style={ispreviousNext[align] ? { cursor: 'pointer' } : { cursor: 'default' }}
                                    title={firstLastLocale[align]}
                                    onClick={() => ispreviousNext[align] && (align=='left'?this.first():this.last())}>
                                    <i className={`fa fa-angle-double-${align} ${!ispreviousNext[align] && 'text-gray'}`}
                                      title={firstLastLocale[align]} />
                                  </a>
                                </li>
                                <li className={`paginate_button ${!ispreviousNext[align] && 'disabled'}`} >
                                  <a style={ispreviousNext[align] ? { cursor: 'pointer' } : { cursor: 'default' }}
                                    onClick={() => ispreviousNext[align] && (align=='left'?this.previous():this.next())}
                                    title={previousNextLocale[align]}>
                                    <i className={`fa fa-angle-${align} ${!ispreviousNext[align] && 'text-gray'}`}
                                      title={previousNextLocale[align]} />
                                  </a>
                                </li>

                                <li className="paginate_button" >
                                  <a>
                                    <input type="number" style={{ width: 40, height: 20, }} defaultValue={pageNumber}
                                      disabled={!ispreviousNext[reverseAlign] && !ispreviousNext[align]}
                                      onKeyDown={(e) => {
                                        if (e.keyCode == 13) {
                                          this.setPage(Number(e.target.value))
                                        }
                                      }}
                                    />
                                    &nbsp;/&nbsp;
                                    {Math.ceil(count / pageSize)}
                                  </a>
                                </li>
                                <li className={`paginate_button  ${!ispreviousNext[reverseAlign] && 'disabled'}`} >
                                  <a style={ispreviousNext[reverseAlign] ? { cursor: 'pointer' } : { cursor: 'default' }}
                                    onClick={() => ispreviousNext[reverseAlign] && (align=='left'?this.next():this.previous())}
                                    title={previousNextLocale[reverseAlign]}
                                    >
                                    <i className={`fa fa-angle-${reverseAlign} ${!ispreviousNext[reverseAlign] && 'text-gray'}`}
                                      title={previousNextLocale[reverseAlign]}
                                      ></i>
                                  </a>
                                </li>
                                <li className={`paginate_button  ${!ispreviousNext[reverseAlign] && 'disabled'}`} >
                                  <a style={ispreviousNext[reverseAlign] ? { cursor: 'pointer' } : { cursor: 'default' }}
                                    onClick={() => ispreviousNext[reverseAlign] && (align=='left'?this.last():this.first())}
                                    title={firstLastLocale[reverseAlign]}
                                    >
                                    <i className={`fa fa-angle-double-${reverseAlign} ${!ispreviousNext[reverseAlign] && 'text-gray'}`}
                                      title={firstLastLocale[reverseAlign]}></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      }
                    </div>

                    :
                    <div className="no-data">
                      {ln('noDataIsAvailable')}.
                    </div>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
        <FormGeneratorModal buttonText='modalTitleExportFile' iconName="file-excel-o" innerForm="exportFile"
          submitAction={this.props.listHandlers.exportFile}
          />
      </section>

    )
  }
}
