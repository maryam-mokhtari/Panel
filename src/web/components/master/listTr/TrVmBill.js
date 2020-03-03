import React, { Component } from 'react'
import {push} from 'react-router-redux'
import Link from 'react-router/lib/Link'
import { getNormalizedDigit,} from '../../../../utils/normalize'
import { getPeriodColor,} from '../../../../utils/color'
import {getOsName} from '../../../../utils/vps'
import {baseRoute} from '../../../../utils/route'
import {getPDate} from '../../../../utils/date'
import VMStatus from './VMStatus'
import {language, ln, dir} from '../../../../utils/language'

export default class TrVmBill extends Component {
  render() {
    console.log('TrVmBill props : ', this.props)
    const {item, pageNumber, pageSize, index, dispatch, lastParams, isUser} = this.props
    const vmbill = item
    const hypId = lastParams? lastParams.hypId: null

    if (!vmbill || !vmbill.lastInvoice) {
      return <tr />
    }
    // console.log('osName', vmbill, vmbill.os);
    let osName = getOsName(vmbill.os)
    let vmbillLink = `/${baseRoute.master}/vmbill/${vmbill.id}`
    if (hypId) {
      vmbillLink += `/${hypId}`
    }
    const {name, primaryDisk, ram, cpuCores, lastInvoice, vm, vmBillStatus} = vmbill
    const {user, from, to, paid, recurringPeriod, totalPrice,} = lastInvoice
    const {username} = user

    let vmStatusProps = {from, to, paid}
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize?(pageNumber - 1) * pageSize + index + 1: index + 1}
        </td>
        <td data-title={ln('thname')} className="en-font">
          <Link to={vmbillLink} style={{cursor: 'pointer'}}>
            {name}
          </Link>
        </td>
        <td data-title={ln('thos')} className="en-font">{osName}</td>
        <td data-title={ln('thdisk')}>{primaryDisk}</td>
        <td data-title={ln('thram')}>{ram}</td>
        <td data-title={ln('thcpu')}>{cpuCores}</td>

        {!isUser &&
          <td data-title={ln('thusername')} onClick={() => this.props.dispatch(push(`/${baseRoute.master}/user/${user.id}`))}>
            <Link className="en-font" to={`/${baseRoute.master}/user/${vmbill.lastInvoice.user.id}`} style={{cursor: 'pointer'}}>
              {username || '-'}
            </Link>
          </td>
        }
        <td data-title={ln('thstartdate')}>{from ? getPDate(from): '-'}</td>
        <td data-title={ln('thenddate')}>{to ? getPDate(to): '-'}</td>
        <td data-title={ln('thvmstate')} className={`web-center text-${vm && (vm.state == 'ON'? 'green': vm.state == 'OFF'? 'orange': 'red')}`}>
          <small>{vm? ln(vm.state.toLowerCase()): '-'}</small>
        </td>
        <td data-title={ln('thvmbill')} className="web-center">{vmBillStatus == 'CREATE'?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thpaid')} className="web-center">{paid?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thperiod')} className={`text-${getPeriodColor(recurringPeriod)}`} >{recurringPeriod?ln(recurringPeriod.toLowerCase()):'-'}</td>
        <td data-title={ln('thprice')}>{totalPrice? getNormalizedDigit(totalPrice, true): '-'}</td>
        <td data-title={ln('thsysname')} className="en-font">{vm ? vm.sysName : '-'}</td>
        <td data-title={ln('thvm')} className="web-center">{vm?<i className="fa fa-check text-green"/>:<i className="fa fa-times text-red"/>}</td>
        <td data-title={ln('thstatus')}>
          <VMStatus {...vmStatusProps}/>
        </td>
      </tr>
    )
  }
}
