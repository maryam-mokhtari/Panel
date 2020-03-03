import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import {getNormalizedDigit} from '../../../../utils/normalize'
import {baseRoute} from '../../../../utils/route'
import {getPDate} from '../../../../utils/date'
import {UserType} from '../../../../utils/user'
import {UserTypes} from '../../../../utils/usertype'
import {language as languageFile, ln, dir} from '../../../../utils/language'
import { siteConfig, } from '../../../../utils/siteConfig'

export default class TrUser extends Component {
  render() {
    const {item, pageNumber, pageSize, index, dispatch, } = this.props

    const user = item
    const {username, displayName, balance, email, mobileNumber, mobileVerified,
      verificationCode, enabled, groups, language, name, family, profile, authorized, createdAt,
    } = user

    const customerType = profile? profile.customerType: '-'
    // console.log('TrUser props', this.props);
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td data-title={ln('thusername')}>
          <Link className="en-font" to={`/${baseRoute.master}/user/${user.id}`} style={{cursor: 'pointer'}}>
            {username}
          </Link>
        </td>
        <td data-title={ln('thname')}>
          {name}&nbsp;{family}
        </td>
        {siteConfig.key == 'pg' &&
          <td data-title={ln('thbalance')}>{getNormalizedDigit(balance, true)}</td>
        }
        <td data-title={ln('themail')} className="en-font">{email}</td>
        <td data-title={ln('thmobile')}>{mobileNumber? mobileNumber: '-'}</td>
        <td data-title={ln('thenabled')}>{enabled? <i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thauthorized')}>{authorized? <i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thusertype')}>
          {UserTypes(groups)}
        </td>
        <td data-title={ln('thcustomertype')} className={customerType == 'individual'?
          'text-blue': customerType == 'business'? 'text-green': 'text-grey'}>{ln(customerType)}</td>
        <td data-title={ln('thlanguage')}>{language? language.code + '-' + language.name: '-'}</td>
        <td data-title={ln('registrationDate')}>{createdAt?getPDate(createdAt):'-'}</td>
      </tr>
    )
  }
}
