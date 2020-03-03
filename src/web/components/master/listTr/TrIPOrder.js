import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import { getNormalizedDigit, } from '../../../../utils/normalize'
import { getPeriodColor} from '../../../../utils/color'
import {getOsName} from '../../../../utils/vps'
import {baseRoute} from '../../../../utils/route'
import {getPDate} from '../../../../utils/date'
import VMStatus from './VMStatus'
import {language, ln, dir} from '../../../../utils/language'

export default class TrIPOrder extends Component {

  render() {
    console.log('TrIPOOrder props : ', this.props)
    const {item, pageNumber, pageSize, index, dispatch, isUser} = this.props
    const userOrder = item
    // if (!userOrder || !userOrder.lastInvoice) {
    //   return <tr />
    // }
    const {ip, status, vmBill, owner,
    } = userOrder
    const {cpuCores, primaryDisk, ram, vmBillStatus, lastInvoice, name, vm, } = vmBill
    const {from, to, paid, payablePrice, totalPrice, recurringPeriod} = lastInvoice
    let osName = getOsName(vmBill.os)
    let vmStatusProps = { from, to, paid }

    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td data-title={isUser ? ln('thip') : ln('thusername')}>{isUser ? ip : <Link to={`/${baseRoute.master}/user/${owner.id}`} style={{ cursor: 'pointer' }}>{owner.username}</Link>}</td>
        <td data-title={ln('thVmName')}><Link to={`/${baseRoute.master}/vmbill/${vmBill.id}`} style={{cursor: 'pointer'}}>{name}</Link></td>
        <td data-title={ln('thcpu')}>{cpuCores}</td>
        <td data-title={ln('thram')}>{ram}</td>
        <td data-title={ln('thdisk')}>{primaryDisk}</td>
        <td data-title={ln('thos')}>{osName}</td>
        <td data-title={ln('thstartdate')}>{getPDate(from)}</td>
        <td data-title={ln('thenddate')}>{getPDate(to)}</td>
        <td data-title={ln('thperiod')} className={`text-${getPeriodColor(recurringPeriod)}`}>{recurringPeriod?ln(recurringPeriod.toLowerCase()):'-'}</td>
        <td data-title={ln('thprice')}>{getNormalizedDigit(totalPrice, true)}</td>
        <td data-title={ln('thpaid')}>{paid?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thvm')}>{vm?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thactive')}>{status == 'ACTIVE'?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thstatus')}>
          <VMStatus {...vmStatusProps} />
        </td>

      </tr>
    )
  }
}
