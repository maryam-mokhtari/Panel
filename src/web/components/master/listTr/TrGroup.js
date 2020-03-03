import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import {getNormalizedDigit, getNormedBytes,} from '../../../../utils/normalize'
import {getCategoryColor, percentColor, } from '../../../../utils/color'
import {getPDate} from '../../../../utils/date'
import { baseRoute } from '../../../../utils/route'
import ProgressBar from '../../general/ProgressBar'
import {language, ln, dir} from '../../../../utils/language'

export default class TrGroup extends Component {
  render() {
    console.log('TrGroup props : ', this.props)
    const {item, pageNumber, pageSize, index, dispatch} = this.props
    const group = item
    if (!group) {
      return <tr/>
    }
    const {id, groupName, memberCount, plan, adminUser, groupQuota, } = group
    const planQuota = JSON.parse(plan.jsonInfo).quota
    const gigToByte = 1024 * 1024 * 1024
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td data-title={ln('thgroupname')}>
          <Link className="en-font" to={`/${baseRoute.master}/group/${id}`}>{groupName || '-'}</Link>
        </td>
        <td data-title={ln('thmembercount')}>{memberCount || '-'}</td>
        <td data-title={ln('thplanname')}>
          <Link className="en-font" to={`/${baseRoute.master}/plan/${plan.id}`}>{plan.name || '-'}</Link>
        </td>
        <td data-title={ln('thadminname')}>
          <Link className="en-font" to={`/${baseRoute.master}/user/${adminUser.id}`} style={{ cursor: 'pointer' }}>
            {adminUser.username || '-'}
          </Link>
        </td>
        <td data-title={ln('thquota')}>
          <ProgressBar usedQuota={groupQuota} baseQuota={planQuota} />
        </td>
        <td data-title={ln('thinvoices')}>
          <Link to={`/${baseRoute.master}/invoices/all/${adminUser.id}`}>
            {ln('adminInvoices')}
          </Link>
        </td>
      </tr>
    )
  }
}
