import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import Jalaali from 'jalaali-js'
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2'
import 'react-datepicker2/dist/react-datepicker2.min.css'
import FormGeneratorModal from '../../../components/general/FormGeneratorModal'
import Loading from '../../../components/general/Loading'
import {
  loadSingleInvoice, payInvoice, rejectInvoicePayment
} from '../../../../actions'
import { getNormalizedDigit, } from '../../../../utils/normalize'
import { getPeriodColor, } from '../../../../utils/color'
import { clearFormGeneratorModal, } from '../../../../utils/form'
import { getPDate } from '../../../../utils/date'
import { siteConfig } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import {language, ln, dir} from '../../../../utils/language'
import { isArrayOK } from '../../../../utils/array'
import {isUserInRole, getUserRole, ADMIN}  from '../../../../utils/role'

class InvoiceSinglePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      paidDateValue: moment()
    }
  }
  componentDidMount() {
    this.props.loadSingleInvoice(this.props.invoiceId)
  }
  render() {
    const { cfsInvoiceLoading, invoiceData, invoiceRejectData, invoiceId, payInvoiceLoading,
      payInvoice, rejectInvoicePayment, rejectInvoicePaymentLoading,
      userData, userDataLoading,
    } = this.props
    const isNotReadOnly = isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData)
    let invoice = null
    const isInvoice = isArrayOK(invoiceData)
    if (isInvoice) {
      invoice = invoiceData[0]
    }
    let periodColor = isInvoice && getPeriodColor(invoice.recurringPeriod)
    const handlers = {

    }
    let sum = 0
    let discount = 0
    let totWithoutTaxAndDiscount = 0
    if (isInvoice) {
      sum = invoice.invoiceItems.filter(item =>
        (item.priceComponent.priceType == 'BASE'
        || item.priceComponent.priceType == 'SURCHARGE' && item.priceComponent.title != 'TAX'))
        .reduce((a, b) => ({ price: a.price + b.price }), { price: 0 }).price || 0
        discount = invoice.invoiceItems.filter(item =>
          (item.priceComponent.priceType == 'DISCOUNT')
        ).reduce((a, b) => ({ price: a.price + b.price }), { price: 0 }).price || 0

        totWithoutTaxAndDiscount = sum - discount

      }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('invoice')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/invoices`}>{ln('productInvoices')}</Link></li>
            <li className="active">{ln('invoice')}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-widget" style={{ marginBottom: 0 }}>
                <div className="box box-widget widget-user-2" style={{ marginBottom: 0 }}>
                  <div className="box-footer no-padding" style={{ background: '#ecf0f5' }}>
                    <div className="row">
                      <div className="col-md-12">
                        {
                          cfsInvoiceLoading ?
                          <Loading />
                          :
                          isInvoice &&
                          <div className="box" style={{ marginBottom: 0 }}>
                            <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                              <h3 className="box-title title-name" data-widget="collapse" style={{ cursor: 'pointer' }}>
                                <span className={`pull-${dir('align')} en-for-fa`}>{invoice.product? invoice.product.name : ''}</span>
                                &nbsp;&nbsp;
                                <small className={`label bg-${invoice.paid ? 'green' : 'red'}`}>
                                  {ln(invoice.invoiceStatus)}
                                </small>
                              </h3>

                              <div className={`box-tools pull-${dir('reverseAlign')}`}>
                                <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                                  <i className="fa fa-minus"></i>
                                </button>

                              </div>
                            </div>
                            <div className="box-body" style={{ background: 'white' }}>
                              <div className="inner-body">
                                <h4 className="text-light-blue">
                                  <Link className="en-font" to={`/${baseRoute.master}/user/${invoice.user.id}`}>
                                    {invoice.user.email}
                                  </Link>
                                </h4>
                                <div className="row" style={{
                                    marginTop: 5,
                                    marginBottom: 10,
                                  }}>
                                  <div className="col-md-4 text-grey">
                                    <div className="row">
                                      <div className="col-md-4 col-xs-4">{ln('period')}:</div>
                                      <div className="col-md-6">
                                        <span className={`text-${periodColor}`}
                                          style={{ fontSize: '100%' }}>
                                          {ln(invoice.recurringPeriod)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 col-xs-4">{ln('price')}:</div>
                                      <div className="col-md-6 text-green">
                                        {invoice.totalPrice ?
                                          getNormalizedDigit(invoice.totalPrice, true)
                                          :
                                          '-'
                                        }
                                        &nbsp;
                                        {ln('irr')}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 col-xs-4">{ln('paid')}:</div>
                                      <div className="col-md-6">
                                        {
                                          invoice.paid ?
                                          <i className="fa fa-check text-green" />
                                          :
                                          <i className="fa fa-close text-red" />
                                        }
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 col-xs-4">{ln('invoiceStatus')}:</div>
                                      <div className="col-md-6 text-teal">
                                        {invoice.invoiceStatus ? ln(invoice.invoiceStatus) : '-'
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4 text-grey">


                                    <div className="row">
                                      <div className="col-md-3 col-xs-4">{ln('from')}:</div>
                                      <div className="col-md-8 text-blue">
                                        {invoice.persianFrom ? getPDate(invoice.from) : '-'}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-3 col-xs-4">{ln('to')}:</div>
                                      <div className="col-md-8 text-blue">
                                        {invoice.persianTo ? getPDate(invoice.to) : '-'}
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-3 col-xs-4">{ln('created')}:</div>
                                      <div className="col-md-8 text-blue">
                                        {invoice.createdAt ? getPDate(invoice.createdAt) : '-'}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-3 col-xs-4">{ln('expiration')}:</div>
                                      <div className="col-md-8 text-blue">
                                        {invoice.dueDate ? getPDate(invoice.dueDate) : '-'}
                                      </div>
                                    </div>

                                  </div>
                                  <div className="col-md-4 text-grey">
                                    <div className="row">
                                      <div className="col-md-5 col-xs-4">{ln('preInvoiceSerial')}:</div>
                                      <div className="col-md-6 text-blue">
                                        &nbsp; {invoice.preInvoiceSerial || '-'}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-5 col-xs-4">{ln('invoiceSerial')}:</div>
                                      <div className="col-md-6 text-blue">
                                        &nbsp; {invoice.serial || '-'}
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-5 col-xs-4">{ln('payIdentifier')}:</div>
                                      <div className="col-md-6 text-blue">
                                        &nbsp; {invoice.payIdentifier || '-'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {invoice.invoiceItems &&

                                  <table className={`table table-bordered responsive-${language.key}-table`}
                                    style={{ boxShadow: '#eee 2px 1px 2px' }} >
                                    <thead>
                                      <tr style={{ background: '#fafafa' }}>
                                        <th>
                                          {ln('number')}
                                        </th>
                                        <th>
                                          {ln('description')}
                                        </th>
                                        <th>
                                          {ln('quantity')}
                                        </th>
                                        <th>
                                          {ln('rate')}
                                        </th>
                                        <th>
                                          {ln('cost')}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        invoice.invoiceItems.filter(item =>
                                          (item.priceComponent.priceType != 'SURCHARGE' || item.priceComponent.title != 'TAX')
                                          && (item.priceComponent.priceType != 'DISCOUNT' || item.price != 0))

                                          .map((item, index) => {
                                            return (
                                              <tr key={item.id}>
                                                <td data-title="No.">
                                                  {index + 1}
                                                </td>
                                                <td data-title="Description">
                                                  {ln(item.priceComponent.title)}
                                                </td>
                                                <td data-title="Quantity">
                                                  {item.quantity}
                                                  {(item.priceComponent.title == 'CPU') ? ' Core'
                                                    : (item.priceComponent.title == 'RAM') ? ' GB'
                                                    : (item.priceComponent.title == 'DISK') ? ' GB' : ''
                                                  }
                                                </td>
                                                <td data-title="Rate">
                                                  {item.priceComponent.priceType == 'BASE'
                                                    && (invoice.product.category == 'CWS' || invoice.product.category == 'CWS_HOST') ?
                                                    item.quantity > 0 ? getNormalizedDigit(item.price / item.quantity, true) + ' ' + ln('irr') : '-'
                                                    : item.priceComponent.priceType == 'DISCOUNT' && item.priceComponent.valueApplication == 'PERCENT' ?
                                                    Math.round(item.quantityBreak.value) + ' % '
                                                    : getNormalizedDigit(item.price, true) + ' ' + ln('irr')
                                                  }
                                                </td>
                                                <td data-title="Cost">
                                                  {getNormalizedDigit(item.price, true) + ' ' + ln('irr')}
                                                </td>
                                              </tr>
                                            )
                                          })
                                      }
                                      {invoice.refundPrice > 0 &&
                                        <tr>
                                          <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                            {ln('refundPrice')}
                                          </td>
                                          <td className={`td-responsive-${language.key}-no-pad`}>
                                            {getNormalizedDigit(invoice.refundPrice, true) + ' ' + ln('irr')}
                                          </td>
                                        </tr>
                                      }
                                      <tr>
                                        <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                          {ln('totalPricewithoutTaxandDiscount')}
                                        </td>
                                        <td className={`td-responsive-${language.key}-no-pad`}>
                                          {getNormalizedDigit(totWithoutTaxAndDiscount, true) + ' ' + ln('irr')}
                                        </td>
                                      </tr>
                                      {
                                        invoice.invoiceItems.filter(item => item.priceComponent.priceType == 'SURCHARGE' &&
                                          item.priceComponent.title == 'TAX').map((item, index) => (
                                            <tr key={index}>
                                              <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                                9 {ln('percentTaxes')}
                                              </td>
                                              <td className={`td-responsive-${language.key}-no-pad`}>
                                                {getNormalizedDigit(Math.round(item.price, true)) + ' ' + ln('irr')}
                                              </td>
                                            </tr>
                                        ))
                                      }
                                      <tr>
                                        <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                          {ln('totalPrice')}
                                        </td>
                                        <td className={`td-responsive-${language.key}-no-pad`}>
                                          {getNormalizedDigit(invoice.totalPrice, true)} IRR
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                          {ln('trackDate')}
                                        </td>
                                        <td className={`td-responsive-${language.key}-no-pad`}>
                                          {invoice.trackDate ? getPDate(invoice.trackDate) : '-'}
                                        </td>
                                      </tr>
                                      {(isNotReadOnly && !invoice.paid && invoice.invoiceStatus != "REJECT" && invoice.invoiceStatus != 'DRAFT') &&
                                        <tr id="payRejectRow">
                                          <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                            {ln('acceptRejectRequest')}
                                          </td>
                                          <td className={`td-responsive-${language.key}-no-pad`}>
                                            <div className="form-inline">
                                              <button type="button" className="btn btn-success res-btn"
                                                onClick={() => {
                                                  document.getElementById('payRow').classList.remove('hidden')
                                                  document.getElementById('payRejectRow').classList.add('hidden')
                                                }}
                                                >
                                                  {ln('accept')} &nbsp;<i className="fa fa-check" aria-hidden="true"></i>
                                              </button> &nbsp;
                                              <button type="button" className="btn btn-danger res-btn"
                                                onClick={() => {
                                                  document.getElementById('rejectRow').classList.remove('hidden')
                                                  document.getElementById('payRejectRow').classList.add('hidden')
                                                }}
                                                >
                                                {ln('doReject')} &nbsp; <i className="fa fa-times" aria-hidden="true"></i> &nbsp;
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      }
                                      {isNotReadOnly && !invoice.paid &&
                                        <tr id="payRow" className="hidden">
                                          <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                            {ln('acceptPayment')}
                                          </td>
                                          <td ref="tdDate" className="res-accept">
                                            {/*<div className="row">*/}
                                            <div className="form-inline res-reject-form" >
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="col-md-8 col-sm-8">
                                                    <div className="form-group">
                                                      <label className="control-label" htmlFor="">{ln('date')}: &nbsp; </label>
                                                      <DatePicker type="date" ref="paidDate" id="paidDate" className="form-control invoice-date-picker"
                                                        isGregorian={language.key != 'fa'}
                                                        value={this.state.paidDateValue}
                                                        onChange={paidDateValue => this.setState({paidDateValue})}
                                                        />
                                                    </div>
                                                  </div>
                                                  <div className="col-md-4 col-sm-4 res-accept">
                                                    <button type="button" className="btn btn-success"
                                                      disabled={payInvoiceLoading == invoice.id}
                                                      onClick={() => payInvoice(invoice.id, new Date(this.state.paidDateValue).getTime())}>
                                                      {ln('accept')} &nbsp;
                                                      {payInvoiceLoading == invoice.id ?
                                                        <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                                                        :
                                                        <i className="fa fa-check" aria-hidden="true"></i>
                                                      }
                                                    </button>
                                                    <button className={`btn pull-${dir('reverseAlign')}`}
                                                      onClick={() => {
                                                        document.getElementById('payRow').classList.add('hidden')
                                                        document.getElementById('payRejectRow').classList.remove('hidden')
                                                      }}
                                                      > {ln('cancel')}
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            {/*</div>*/}
                                          </td>
                                        </tr>
                                      }
                                      {isNotReadOnly && !invoice.paid && !(invoice.invoiceStatus == "REJECT") &&
                                        <tr id="rejectRow" className="hidden">
                                          <td colSpan="4" className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                            {ln('doReject')}
                                          </td>
                                          <td ref="tderr" className="res-accept">
                                            <div className="form-inline res-reject-form" >
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="col-md-8 col-sm-8">
                                                    <div className="form-group">
                                                      <label className="control-label" htmlFor="">{ln('paymentError')}: &nbsp; </label>
                                                      <select onChange={() => {
                                                            if (this.refs.errorDropDown.value > 0) {
                                                              this.refs.tderr.classList.remove('has-error')
                                                            } else {
                                                              this.refs.tderr.classList.add('has-error')
                                                            }
                                                          }
                                                        }
                                                      ref="errorDropDown" id="errorDropDown" className="form-control">
                                                        <option value="0">---</option>
                                                        <option value="1">{ln('invoiceError')[1]}</option>
                                                        <option value="2">{ln('invoiceError')[2]}</option>
                                                        <option value="3">{ln('invoiceError')[3]}</option>
                                                        <option value="4">{ln('invoiceError')[4]}</option>
                                                      </select>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-4 col-sm-4 res-accept">
                                                    <button type="button" className="btn btn-danger"
                                                      disabled={rejectInvoicePaymentLoading == invoice.id}
                                                      onClick={(e) => {
                                                        if (this.refs.errorDropDown.value > 0) {
                                                          this.refs.tderr.classList.remove('has-error')
                                                          rejectInvoicePayment(invoice.id, document.getElementById('errorDropDown').value)
                                                          {/*document.getElementById('rejectRow').classList.add('hidden')*/ }
                                                        }
                                                        else {
                                                          this.refs.tderr.classList.add('has-error')
                                                        }
                                                      }}
                                                      >
                                                      {ln('doReject')}
                                                      &nbsp;
                                                      {rejectInvoicePaymentLoading == invoice.id ?
                                                        <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                                                        :
                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                      }
                                                    </button>

                                                    <button className={`btn pull-${dir('reverseAlign')}`}
                                                      onClick={() => {
                                                        document.getElementById('rejectRow').classList.add('hidden')
                                                        document.getElementById('payRejectRow').classList.remove('hidden')
                                                      }}
                                                      >{ln('cancel')}
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      }
                                      {(invoice.invoiceStatus != 'REJECT' && invoice.invoiceStatus != 'DRAFT') &&
                                        <tr >
                                          <td colSpan='4' className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                            {invoice.paid &&
                                              <span className="text-green">{ln('paidDate')}</span>
                                            }
                                          </td>
                                          <td className={`td-responsive-${language.key}-no-pad`}>
                                            {(invoice.paid) &&
                                              <span className="text-green">
                                                {invoice.approvedAt && getPDate(invoice.approvedAt)}
                                              </span>
                                            }
                                          </td>
                                        </tr>
                                      }
                                      {invoice.invoiceStatus == "REJECT" &&
                                        <tr className="text-red">
                                          <td colSpan="4" className={`invoice-td td-responsive-${language.key}-no-pad`}>
                                            <span>{ln('rejectDue')}</span>
                                          </td>
                                          <td className={`td-responsive-${language.key}-no-pad`}>
                                            <span>
                                              {ln('invoiceError')[invoice.rejectDue]}
                                            </span>
                                          </td>
                                        </tr>
                                      }
                                      {invoice.invoiceStatus == "DRAFT" &&
                                        <tr className="text-orange">
                                          <td colSpan="4" className={`invoice-td td-responsive-${language.key}-no-pad`}></td>
                                          <td className={`td-responsive-${language.key}-no-pad`}> <span>{ln('theinvoiceisstillDRAFT')}</span></td>
                                        </tr>
                                      }
                                    </tbody>
                                  </table>
                                }
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { invoiceId } = ownProps.params
  const {
    cfsInvoiceLoading,
    invoiceData, invoiceRejectData,
    payInvoiceLoading, rejectInvoicePaymentLoading,
  } = state.masterEntities
  const {userData, userDataLoading} = state.generalEntities
  return {
    userData, userDataLoading,
    cfsInvoiceLoading,
    invoiceData,
    invoiceRejectData,
    invoiceId,
    payInvoiceLoading,
    rejectInvoicePaymentLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      loadSingleInvoice, payInvoice, rejectInvoicePayment
    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSinglePage)
