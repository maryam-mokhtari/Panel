import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import {getNormalizedDigit} from '../../../../utils/normalize'
import {baseRoute} from '../../../../utils/route'
import {getPDate} from '../../../../utils/date'
import {UserType} from '../../../../utils/user'
import {ln, dir, swip,} from '../../../../utils/language'
import {UserTypes} from '../../../../utils/usertype'

const Status = {
  0: {step: 0, value: 'user', color: 'gray'},
  1: {step: 1, value: 'isRegistered', color: 'red'},
  2: {step: 2, value: 'isEnabled', color: 'orange'},
  3: {step: 3, value: 'hasProfile', color: 'yellow'},
  4: {step: 4, value: 'isAuthorized', color: 'aqua'},
  5: {step: 5, value: 'hasInvoice', color: 'blue'},
  6: {step: 6, value: 'hasPlan', color: 'green'},
}

export default class TrCadminUser extends Component {
  render() {
    const {item, pageNumber, pageSize, index, dispatch, } = this.props

    const user = item
    const {id, username, displayName, balance, email, mobileNumber, mobileVerified,
      verificationCode, enabled, groups, language, name, family, authorized, createdAt,
      lastInvoiceStatus, plan,
    } = user
    let profile = user.profile || {}
    let status;
    let color;
    if (!enabled) {
      status = Status[1]
    } else if (!user.profile) {
      status = Status[2]
    } else if (!authorized) {
      status = Status[3]
    } else if (!lastInvoiceStatus) {
      status = Status[4]
    } else if (lastInvoiceStatus != 'PAID') {
      status = {step: 5, value:ln('invoice') + ' ' + ln(lastInvoiceStatus.toLowerCase()), color: 'blue'}
    } else if (JSON.parse(plan.jsonInfo).type == 'business') {
      status = Status[6]
    } else {
      status = Status[0]
    }
    const {companyNationalCode, company, companyName, nationalId, } = profile
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td data-title={ln('profileId')}>{id}</td>
        <td data-title={ln('companyNationalCode')}>{companyNationalCode}&nbsp;</td>
        <td data-title={ln('companyName')}>{company}&nbsp;</td>
        <td data-title={ln('thusername')}>
          <Link className="en-font" to={`/${baseRoute.master}/user/${user.id}`} style={{cursor: 'pointer'}}>
            {username}
          </Link>
        </td>
        <td data-title={swip('nationalId', 'cadmin')}>{nationalId}&nbsp;</td>
        <td data-title={swip('thname', 'cadmin')}>{name}&nbsp;{family}</td>
        <td data-title={ln('themail')} className="en-font">{email}</td>
        <td data-title={ln('thmobile')}>{mobileNumber? mobileNumber: '-'}</td>
        {/*}<td data-title={ln('thenabled')}>{enabled? <i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thauthorized')}>{authorized? <i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        */}
        <td data-title={ln('thusertype')}>{UserTypes(groups)}</td>
        <td data-title={ln('registrationDate')}>{getPDate(createdAt)}</td>
        <td data-title={ln('status')} className={`text-${status.color}`}>
          {status.step}-{ln(status.value)}
        </td>
      </tr>
    )
  }
}
