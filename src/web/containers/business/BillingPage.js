import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import moment from 'moment-jalaali'
import DatePicker from 'react-datepicker2'
import 'react-datepicker2/dist/react-datepicker2.min.css'
import {
  offlinePayment, loadBilling,
} from '../../../actions'
import { siteConfig, } from '../../../utils/siteConfig'
import {isValid, clear} from '../../../utils/form'
import {baseRoute} from '../../../utils/route'
import {isArrayOK} from '../../../utils/array'
import {language, ln, dir} from '../../../utils/language'
import {getNormalizedDigit, getNormedBytes, } from '../../../utils/normalize'
import Loading from '../../components/general/Loading'


class BillingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trackDateValue: moment()
    }
  }
  componentDidMount() {
    this.props.loadBilling()
    document.getElementsByTagName('body')[0].classList.add('sidebar-collapse')
  }
  getInvoiceStatus(status, invoiceErrorStatus) {
    console.log('getInvoiceStatus', status, invoiceErrorStatus, ln('invoiceState'), ln('invoiceState')[status]);
    return (status == 'REJECT' && invoiceErrorStatus) ?
    ln('invoiceState')[status] + ": " + ln('invoiceError')[invoiceErrorStatus]
    : ln('invoiceState')[status]
  }
  getStatusColor(enStatus) {
    const statusColor = {
      'DRAFT': 'aqua',
      'PENDING': 'orange',
      'PAID': 'green',
      'REJECT': 'red',
    }
    return statusColor[enStatus]
  }
  isValid(mode, value) {
    console.log('isValid::', mode, value, this.refs);
    this.setState({ [mode + 'Value']: value })
    if (this.refs && this.refs[mode+'Div']) {
      if (value) {
        this.refs[mode+'Div'].classList.remove('has-error')
        return true
      } else {
        this.refs[mode+'Div'].classList.add('has-error')
        return false
      }
    }
  }
  render() {
    console.log('BillingPage', this.props);
    const {
      loadBilling, offlinePayment,
      userData, userDataLoading,
      billingData, billingLoading,
      offlinePaymentLoading,
    } = this.props
    return (
      <div>
        <section className="content-header">
          <h1>

            {ln('invoices')}&nbsp;
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.business}`}>{ln('home')}</Link></li>
            <li className="active">{ln('invoices')}</li>
          </ol>
        </section>
        {billingLoading != false || userDataLoading?
          <Loading />
          :
          <section className="content" style={{direction: ln('direction')}}>
            <div className="row docs-premium-template">
              <div className="col-lg-12">

                {!isArrayOK(billingData)?
                  <div style={{padding: 30}}>
                    {ln('noInvoiceForYou')}
                    .
                  </div>
                  :
                  <table className={`table box-white responsive-${language.key}-table`}>
                    <thead>
                      <tr>
                        <th>
                          {ln('number')}
                        </th>
                        <th>
                          {ln('payIdentifier')}
                        </th>
                        <th>
                          {ln('invoiceSerial')}
                        </th>
                        <th>
                          {ln('preInvoiceSerial')}
                        </th>
                        <th>
                          {ln('product')}
                        </th>
                        <th>
                          {ln('createdDate')}
                        </th>
                        <th>
                          {ln('approvedAtDate')}
                        </th>
                        <th>
                          {ln('price')}
                        </th>
                        <th>
                          {ln('state')}
                        </th>
                        {/*<th>
                          {ln('onlinePayment')}
                        </th>*/}
                        <th>
                          {ln('offlinePayment')}
                        </th>
                        <th>
                          {ln('submitPaidDate')}
                        </th>
                        <th>
                          {ln('confirmRequest')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingData.map((item, index) => {
                        const invoice = item.invoice? item.invoice : item
                        const isInvoiceDraft = !invoice.paid && invoice.invoiceStatus == 'DRAFT'
                        console.log('shouldShowButton', isInvoiceDraft, invoice.dueDate, new Date().getTime());
                        const shouldShowButton = isInvoiceDraft && invoice.dueDate > new Date().getTime()
                        return (
                          <tr key={item.id}>
                          <td data-title={ln('number')}>
                            {index + 1}
                          </td>
                          <td data-title={ln('payIdentifier')}>
                            {(invoice.payIdentifier) ? invoice.payIdentifier : '-'}
                          </td>
                          <td data-title={ln('invoiceSerial')}>
                            <Link className={!invoice.paid && 'link--disabled'} style={{ display: 'block' }} to={`/cadmin/invoice/${item.id}`}>
                              {invoice.serial ? invoice.serial : '-'}
                            </Link>
                          </td>
                          <td data-title={ln('preInvoiceSerial')}>
                            <Link className={invoice.paid && 'link--disabled'} style={{ display: 'block' }} to={`/cadmin/invoice/${item.id}`}>
                              {invoice.preInvoiceSerial}
                            </Link>
                          </td>
                          <td data-title={ln('product')} className="en-for-fa" style={{textAlign: dir('align')}}>
                            {item.product && item.product.name || '-'}
                          </td>
                          <td data-title={ln('createdDate')}>
                            {invoice.persianCreatedAt ? invoice.persianCreatedAt : '-'}
                          </td>
                          <td data-title={ln('approvedAtDate')}>
                            {invoice.persianApprovedAt ? invoice.persianApprovedAt : '-'}
                          </td>
                          <td data-title={ln('price')}>
                            {(invoice.payablePrice) ? getNormalizedDigit(invoice.payablePrice, true)
                              : getNormalizedDigit(invoice.totalPrice, true)} {ln('irr')}
                          </td>
                          <td data-title={ln('state')} className={`text-${this.getStatusColor(invoice.invoiceStatus)}`}>
                            {
                              this.getInvoiceStatus(invoice.invoiceStatus, invoice.rejectDue)
                            }
                          </td>
                          {/*<td data-title={ln('onlinePayment')}>
                            {shouldShowButton?
                              <button type="button" className="btn btn-warning btn-sm"
                                aria-label="Left Align" title={ln('onlinePayment')}
                                disabled={false}
                                onClick={() => {}}>
                                {ln('onlinePayment')}
                                &nbsp;
                                {false ?
                                  <i className="fa fa-spinner fa-spin"></i>
                                  :
                                  ''
                                }
                              </button>: <span>&nbsp;</span>
                            }
                          </td>*/}
                          <td data-title={ln('offlinePayment')}>
                            {shouldShowButton?
                              <button id="offlineBtn" type="button" className="btn btn-warning btn-sm"
                                aria-label="Left Align" title={ln('offlinePayment')}
                                disabled={offlinePaymentLoading}
                                onClick={() => {
                                  document.getElementById('offlineBtn').disabled = true
                                  document.getElementById('trackDateDiv').classList.remove('hidden')
                                  document.getElementById('trackDateSubstitute').classList.add('hidden')
                                  document.getElementById('paidConfirmation').classList.remove('hidden')

                                }}>
                                {ln('offlinePayment')}
                              </button>: <span>&nbsp;</span>
                            }
                          </td>
                          <td data-title={ln('submitPaidDate')}>
                            {shouldShowButton?
                              <span id="trackDateDiv" ref="trackDateDiv" className="hidden">
                                <DatePicker isGregorian={language.key != 'fa'}
                                  value={this.state.trackDateValue}
                                  className="form-control input-form" id="trackDate" type="date" ref="trackDate"
                                  onChange={val => this.isValid('trackDate', val)}
                                  />
                              </span>: <span>&nbsp;</span>
                            }
                            <span id="trackDateSubstitute">&nbsp;</span>
                          </td>
                          <td data-title={ln('confirmRequest')}>
                            &nbsp;
                            <span id="paidConfirmation" className="hidden" >
                              {shouldShowButton &&
                                <button type="button" className="btn btn-warning btn-sm"
                                  disabled={offlinePaymentLoading}
                                  onClick={() => {
                                    this.isValid('trackDate', this.state.trackDateValue) &&
                                    offlinePayment(invoice.id, this.state.trackDateValue);
                                    document.getElementById('offlineBtn').disabled = true
                                    }
                                  }
                                  >{ln('confirmRequest')}
                                 &nbsp;
                                  {offlinePaymentLoading &&
                                    <i className="fa fa-spinner fa-spin" />
                                  }
                                </button>
                              }
                            </span>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </section>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    billingData, billingLoading,
    offlinePaymentLoading,
  } = state.businessEntities
  const {userData, userDataLoading} = state.generalEntities
  console.log('userData', userData);
  return {
    billingData, billingLoading,
    offlinePaymentLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    offlinePayment, loadBilling,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage)
