import React, {Component} from 'react'
import Link from 'react-router/lib/Link'
import {language, ln, dir, swip} from '../../../utils/language'
import { getPDate } from '../../../utils/date'
import {getNormalizedDigit} from '../../../utils/normalize'
import {getPersianDate} from '../../../utils/date'
import {isUserInRole, ADMIN} from '../../../utils/role'
import {siteConfig} from '../../../utils/siteConfig'
import {baseRoute} from '../../../utils/route'
import {isArrayOK} from '../../../utils/array'
import { getPeriodColor, } from '../../../utils/color'
import PayInvoice from './PayInvoice'
import Grid from './Grid'

export default class InvoiceIno extends Component {
  render() {
    if (!this.props.invoice) {
      return <div/>
    }
    // /*
    console.log('InvoiceInfo props', this.props);
    const invoice = isArrayOK(this.props.invoice)? this.props.invoice[0] : this.props.invoice
    const isPreInvoice = !invoice.paid
    return (
      <div className={`box ${!isPreInvoice && 'collapsed-box'}`} style={{ marginBottom: 0 }}>
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
              <i className={`fa fa-${isPreInvoice? 'minus': 'plus'}`}></i>
            </button>

          </div>
        </div>
        <div className="box-body" style={isPreInvoice?{}:{ display: 'none' }}>
          <div className="inner-body">
            <h4 className="text-light-blue">
              <Link className="en-font" to={`/${baseRoute.master}/user/${invoice.user.id}`}>
                {invoice.user.email}
              </Link>
            </h4>
            <div className="row pay-wrapper">
              <div className="col-md-4 text-grey">
                <div className="row">
                  <div className="col-md-4 col-xs-4">{ln('period')}:</div>
                  <div className="col-md-6">
                    <span className={`text-${getPeriodColor(invoice.recurringPeriod)}`}>
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
                    {invoice.invoiceStatus ? ln(invoice.invoiceStatus) : '-'}
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
                  <div className="col-md-3 col-xs-4">{ln('createdDate')}:</div>
                  <div className="col-md-8 text-blue">
                    {invoice.createdAt ? getPDate(invoice.createdAt) : '-'}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 col-xs-4">{ln('dueDate')}:</div>
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
          </div>

          <PayInvoice
             handlers={this.props.handlers}
             payInvoiceLoading={this.props.payInvoiceLoading}
             rejectInvoicePaymentLoading={this.props.rejectInvoicePaymentLoading}
             isNotReadOnly={this.props.isNotReadOnly}
             invoice={invoice}
            />
        </div>
      </div>
    )
    // */
  }
}
