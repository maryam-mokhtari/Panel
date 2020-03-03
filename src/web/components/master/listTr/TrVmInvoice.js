import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import { getNormalizedDigit, } from '../../../../utils/normalize'
import {getPDate} from '../../../../utils/date'
import VMStatus from './VMStatus'
import {language, ln, dir} from '../../../../utils/language'

export default class TrVmInvoice extends Component {
  render() {
    const {item, pageNumber, pageSize, index, dispatch, } = this.props
    const vmInvoice = item
    if (!vmInvoice) {
      return <tr />
    }
    const {from, to, createdAt, approvedAt, payable, paid, payablePrice, totalPrice,
    } = vmInvoice
    let vmStatusProps = { from, to, paid }

    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td data-title={ln('thfrom')}>{from ? getPDate(from): '-'}</td>
        <td data-title={ln('thto')}>{to ? getPDate(to): '-'}</td>
        <td data-title={ln('thcreated')}>{createdAt ? getPDate(createdAt): '-'}</td>
        <td data-title={ln('thpaid')}>{approvedAt ? getPDate(approvedAt): '-'}</td>
        <td data-title={ln('thprice')}>{payablePrice? getNormalizedDigit(payablePrice, true): '-'}</td>
        {/*<td data-title="T Price">{totalPrice? getNormalizedDigit(totalPrice, true): '-'}</td>*/}
        <td data-title={ln('thpayable')}>{payable?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thpaid')}>{paid?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thstatus')}>
          <VMStatus {...vmStatusProps} />
        </td>
      </tr>
    )
  }
}
