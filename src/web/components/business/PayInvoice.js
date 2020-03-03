import React, {Component} from 'react'
import Link from 'react-router/lib/Link'
import DatePicker from 'react-datepicker2'
import moment from 'moment-jalaali'
import {language, ln, dir, swip} from '../../../utils/language'
import { getPDate } from '../../../utils/date'
import {getNormalizedDigit} from '../../../utils/normalize'
import {getPersianDate} from '../../../utils/date'
import {isUserInRole, ADMIN} from '../../../utils/role'
import {siteConfig} from '../../../utils/siteConfig'
import {baseRoute} from '../../../utils/route'
import {isArrayOK} from '../../../utils/array'
import { getPeriodColor, } from '../../../utils/color'
import Grid from './Grid'

export default class PayInvoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paidDateValue: moment()
    }
  }
  isValid(refName) {
    console.log('isValid', refName, this.refs);
    if (this.refs[refName].value) {
      this.refs[refName+'Div'].classList.remove('has-error')
      return true
    } else {
      this.refs[refName+'Div'].classList.add('has-error')
      return false
    }
  }
  render() {
    console.log('PayInvoice props', this.props, language);
    const {invoice, isNotReadOnly, payInvoiceLoading, rejectInvoicePaymentLoading, handlers,} = this.props
    return (
      <div className="pay-wrapper invoice-border">
        {(isNotReadOnly && !invoice.paid && invoice.invoiceStatus != "REJECT" && invoice.invoiceStatus != 'DRAFT') &&
          <div id="payRejectRow">
            <h4 className="invoice-space">
              {ln('acceptRejectRequest')}
            </h4>
            <div className="box-body">
              <div className="form-inline">
                <button type="button" className="btn btn-success invoice-btn"
                  onClick={() => {
                    document.getElementById('payRow').classList.remove('hidden')
                    document.getElementById('payRejectRow').classList.add('hidden')
                  }}
                  >
                    {ln('accept')} &nbsp;<i className="fa fa-check" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-danger invoice-btn"
                  onClick={() => {
                    document.getElementById('rejectRow').classList.remove('hidden')
                    document.getElementById('payRejectRow').classList.add('hidden')
                  }}
                  >
                  {ln('doReject')} &nbsp; <i className="fa fa-times" aria-hidden="true"></i> &nbsp;
                </button>
              </div>
            </div>
          </div>
        }
        {isNotReadOnly && !invoice.paid &&
          <div id="payRow" className="hidden">
            <h4 className="invoice-space">
              {ln('acceptPayment')}
            </h4>
            <div ref="tdDate">
              <div className="form-inline" >
                <div className="box-body">
                  <div className="col-lg-5 col-md-5 col-sm-6 row-spaced">
                    <label className="control-label invoice-label">{ln('date')}: &nbsp; </label>
                    <DatePicker type="date" ref="paidDate" id="paidDate" className="form-control"
                      style={{width: '100%'}}
                      isGregorian={language.key != 'fa'}
                      onChange={paidDateValue => this.setState({paidDateValue})}
                      value={this.state.paidDateValue}
                      />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 row-spaced">
                      <button type="button" className="btn btn-success invoice-btn"
                        disabled={payInvoiceLoading == invoice.id}
                        onClick={() =>
                          // console.log('payInvoice', invoice.id, new Date(this.state.paidDateValue).getTime(), this.state.paidDateValue)
                          handlers.payInvoice(invoice.id, new Date(this.state.paidDateValue).getTime())
                        }>
                        {ln('accept')} &nbsp;
                        {payInvoiceLoading == invoice.id ?
                          <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                          :
                          <i className="fa fa-check" aria-hidden="true"></i>
                        }
                      </button>
                      <button className="btn btn-default invoice-btn"
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
          </div>
        }
        {isNotReadOnly && !invoice.paid && !(invoice.invoiceStatus == "REJECT") &&
          <div id="rejectRow" className="hidden">
            <h4 className="invoice-space">
              {ln('doReject')}
            </h4>
            <div ref="tderr1">
              <div className="form-inline" >
                <div className="box-body">
                  <div className="col-lg-5 col-md-8 col-sm-8">
                    <div className="row row-spaced">
                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <label className="control-label invoice-label">{ln('paymentError')}: &nbsp; </label>
                      </div>
                      <div className="col-lg-9 col-md-9 col-sm-9" ref="tderr">
                        <select onChange={() => {
                              if (this.refs.errorDropDown.value > 0) {
                                this.refs.tderr.classList.remove('has-error')
                              } else {
                                this.refs.tderr.classList.add('has-error')
                              }
                            }
                          }
                        style={{minWidth: 230}}
                        ref="errorDropDown" id="errorDropDown" className="form-control">
                          <option value="0">---</option>
                          <option value="1">{ln('invoiceError')[1]}</option>
                          <option value="2">{ln('invoiceError')[2]}</option>
                          <option value="3">{ln('invoiceError')[3]}</option>
                          <option value="4">{ln('invoiceError')[4]}</option>
                        </select>
                      </div>
                    </div>
                    <div className="row row-spaced">
                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <label className="control-label invoice-label">{ln('description')}: &nbsp; </label>
                      </div>
                      <div className="col-lg-9 col-md-9 col-sm-9" ref="descriptionDiv">
                        <textarea id="description" ref="description" className="form-control input-form"
                          style={{minWidth: 230, minHeight: 100}}
                          >
                        </textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-4 row-spaced" style={{padding: '5px 10px'}}>
                    <button type="button" className="btn btn-danger invoice-btn"
                      disabled={rejectInvoicePaymentLoading == invoice.id}
                      onClick={(e) => {
                        if (this.refs.errorDropDown.value > 0 &&
                          (this.refs.errorDropDown.value != this.refs.errorDropDown.length - 1 || this.isValid("description"))
                        ) {
                          this.refs.tderr.classList.remove('has-error')
                          handlers.rejectInvoicePayment(
                            invoice.id,
                            document.getElementById('errorDropDown').value,
                            document.getElementById('description').value)
                        }
                        if (this.refs.errorDropDown.value <= 0) {
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

                    <button className="btn btn-default invoice-btn"
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
          </div>
        }
        {(invoice.invoiceStatus != 'REJECT' && invoice.invoiceStatus != 'DRAFT' && invoice.paid) &&
          <h4 className="text-green invoice-space invoice-result">
            {ln('paidDate')}: &nbsp; {invoice.approvedAt && getPDate(invoice.approvedAt)}
          </h4>
        }
        {invoice.invoiceStatus == "REJECT" &&
          <h4 className="text-red invoice-space invoice-result">
            {ln('rejectDue')}: &nbsp;
            {ln('invoiceError')[invoice.rejectDue]}
          </h4>
        }
        {invoice.invoiceStatus == "DRAFT" &&
          <h4 className="text-orange invoice-space invoice-result">{ln('theinvoiceisstillDRAFT')}</h4>
        }
        <br/>
      </div>
    )
  }
}
