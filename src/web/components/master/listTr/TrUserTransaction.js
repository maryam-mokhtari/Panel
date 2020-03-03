import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import {getNormalizedDigit, } from '../../../../utils/normalize'
import {getPDate} from '../../../../utils/date'
import {language, ln, dir} from '../../../../utils/language'

export default class TrUserTransaction extends Component {
  render() {
    console.log('TrUserTransactions : ', this.props);
    const {item, pageNumber, pageSize, index, dispatch,} = this.props
    const userTransaction = item
    const {amount, persianCreatedAt, from, to, transactionType, description, createdAt,
    } = userTransaction
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td className="en-font" data-title={ln('thsource')}>{from}</td>
        <td className="en-font" data-title={ln('thdestination')}>{to}</td>
        <td data-title={ln('thtype')}>{ln(transactionType.toLowerCase())}</td>
        <td data-title={ln('thdeposit')}>{amount>0? getNormalizedDigit(amount, true): '-'}</td>
        <td data-title={ln('thwithdraw')}>{amount<0? getNormalizedDigit(-1 * amount, true): '-'}</td>
        <td data-title={ln('thcreatedate')}>{getPDate(createdAt)}</td>
        <td data-title={ln('thdescription')} style={{direction: 'rtl'}}>{description}&nbsp;</td>

      </tr>
    )
  }
}
