import React, { Component } from 'react'
import { push } from 'react-router-redux'
import Link from 'react-router/lib/Link'
import { getNormalizedDigit, } from '../../../../utils/normalize'
import { getPeriodColor, getCategoryColor, } from '../../../../utils/color'
import {getPDate} from '../../../../utils/date'
import { baseRoute } from '../../../../utils/route'
import {language, ln, dir} from '../../../../utils/language'

export default class TrCFSInvoice extends Component {
  render() {
    console.log('TrCFSInvoice props is : ', this.props);
    const { item, pageNumber, pageSize, index, dispatch, isUser, lastParams, } = this.props
    const cfsInvoice = item
    if (!cfsInvoice) {
      return <tr />
    }
    const { payable, paid, payablePrice, totalPrice,
      refCode, recurringPeriod, invoiceItems, product, user, id,
      payIdentifier, preInvoiceSerial, serial, createdAt, approvedAt,
      invoiceStatus,
    } = cfsInvoice
    let status = lastParams ? lastParams.status : 'all'
    let stateColor = 'grey'
    switch (invoiceStatus) {
      case 'PAID':
        stateColor = 'green'
        break;
      case 'DRAFT':
        stateColor = 'orange'
        break;
      case 'CANCEL':
        stateColor = 'red'
        break;
      case 'REJECT':
        stateColor = 'red'
        break;
      case 'UPGRADE':
        stateColor = 'blue'
        break;
      case 'PENDING':
        stateColor = 'teal'
        break;
    }
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize ? (pageNumber - 1) * pageSize + index + 1 : index + 1}
        </td>
        <td data-title={ln('thproductname')}>
          <Link className="en-font" to={`/${baseRoute.master}/plan/${product.id}`} style={{ cursor: 'pointer' }}>
            {product.name || '-'}
          </Link>
        </td>
        {!isUser &&
          <td data-title={ln('thusername')}>
            {user?
            <Link className="en-font" to={`/${baseRoute.master}/user/${user.id}`} style={{ cursor: 'pointer' }}> {user.username || '-'}</Link>
            :'--'
            }
          </td>
        }
        <td data-title={ln('thcreatedate')}> {createdAt? getPDate(createdAt) : '-'}</td>
        <td data-title={ln('thpaiddate')}>{approvedAt? getPDate(approvedAt) : '-'}</td>
        <td data-title={ln('thstate')} className={`text-${stateColor}`}>{invoiceStatus?ln(invoiceStatus.toLowerCase()):'-'}</td>
        <td data-title={ln('thprice')}>{totalPrice ? getNormalizedDigit(totalPrice, true) : '-'}</td>
        <td data-title={ln('thperiod')} className={`text-${getPeriodColor(recurringPeriod)}`}>{recurringPeriod?ln(recurringPeriod.toLowerCase()):'-'}</td>
        <td data-title={ln('thpreSerial')}>{preInvoiceSerial || '-'}</td>
        <td data-title={ln('thserial')}>{serial || '-'}</td>
        <td data-title={ln('thpayIdentifier')}>{payIdentifier || '-'}</td>
        {status != 'pending' && <td data-title={ln('paid')}>{paid ? <i className="fa fa-check text-green" /> : <i className="fa fa-times text-red" />}</td>}
        <td data-title=" ">
          {invoiceStatus == 'PENDING' ?
            <button className="btn btn-primary" onClick={() => dispatch(push(`/${baseRoute.master}/invoice/${id}`))}>{ln('payInvoice')}</button>
            :
            <Link to={`/${baseRoute.master}/invoice/${id}`} style={{ cursor: 'pointer' }}>{ln('showInvoice')}</Link>
          }
        </td>
      </tr>
    )
  }
}
