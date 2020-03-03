import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import {getNormalizedDigit,} from '../../../../utils/normalize'
import {getPeriodColor} from '../../../../utils/color'
import {getOsName} from '../../../../utils/vps'
import {getPDate} from '../../../../utils/date'
import {baseRoute} from '../../../../utils/route'
import VMStatus from './VMStatus'
import {language, ln, dir} from '../../../../utils/language'

export default class TrVPSInvoice extends Component {
  render() {
    console.log('TrVPSInvoice', this.props)
    const {item, pageNumber, pageSize, index, dispatch, isUser, } = this.props
    const {invoice, vmBill} = item
    if (!invoice || !vmBill) {
      return <tr/>
    }
    let osName = getOsName(vmBill.os)
    const {refCode,from, to, approvedAt, paid, } = invoice
    const {name, lastInvoice} = vmBill
    const {recurringPeriod, totalPrice, } = lastInvoice
    const isDiscount = lastInvoice && lastInvoice.invoiceItems
      && lastInvoice.invoiceItems.filter(invoiceItem => invoiceItem.priceComponent.priceType == 'DISCOUNT').length
    let discount = '-'
    if (isDiscount) {
      const discountItem = lastInvoice.invoiceItems.filter(invoiceItem => invoiceItem.priceComponent.priceType == 'DISCOUNT')[0]
      discount = discountItem.priceComponent.valueApplication == 'PERCENT'? discountItem.quantityBreak.value +  ' %'
      : discountItem.priceComponent.title == 'CANCEL'? '-': getNormalizedDigit(discountItem.quantityBreak.value, true) + ' ' + ln('irr')
    }
    let vmStatusProps = { from, to, paid }
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        {/*<td data-title="RefCode">{refCode || '-'}</td>*/}
        <td className="en-font" data-title={ln('thVmName')}><Link to={`/${baseRoute.master}/vmbill/${vmBill.id}`} style={{cursor: 'pointer'}}>{name || '-'}</Link></td>
        {!isUser &&
          <td data-title={ln('thusername')}><Link className="en-font" to={`/${baseRoute.master}/user/${invoice.user.id}`} style={{cursor: 'pointer'}}> {invoice.user.username || '-'}</Link></td>
        }
        <td className="en-font" data-title={ln('thos')}>{osName || '-'}</td>
        <td data-title={ln('thstartdate')}>{from ? getPDate(from): '-'}</td>
        <td data-title={ln('thenddate')}>{to ? getPDate(to): '-'}</td>
        <td data-title={ln('thpaid')}>{paid?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thpaiddate')}>{approvedAt ? getPDate(approvedAt): '-'}</td>
        <td data-title={ln('thperiod')} className={`text-${getPeriodColor(recurringPeriod)}`}>{recurringPeriod?ln(recurringPeriod.toLowerCase()):'-'}</td>
        <td data-title={ln('thprice')}>{totalPrice? getNormalizedDigit(totalPrice, true): '-'}</td>
        <td data-title={ln('thdiscount')}>{discount || '-'}</td>
        <td data-title={ln('thstatus')}>
          <VMStatus {...vmStatusProps} />
        </td>
      </tr>
    )
  }
}
