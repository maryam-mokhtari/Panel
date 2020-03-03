import React, { Component } from 'react'

// master
import TrVmBill from '../master/listTr/TrVmBill'
import TrVmInvoice from '../master/listTr/TrVmInvoice'
import TrUserTransaction from '../master/listTr/TrUserTransaction'
import TrIPOrder from '../master/listTr/TrIPOrder'
import TrUser from '../master/listTr/TrUser'
import TrVPSInvoice from '../master/listTr/TrVPSInvoice'
import TrProduct from '../master/listTr/TrProduct'
import TrGroup from '../master/listTr/TrGroup'
import TrCFSInvoice from '../master/listTr/TrCFSInvoice'
import TrCadminUser from '../master/listTr/TrCadminUser'
import TrEndUser from '../master/listTr/TrEndUser'

//business
import TrGroupUser from '../business/listTr/TrGroupUser'

export default class TR extends Component {
  render() {
    // console.log('TR', this.props);
    const dataTrProps = {...this.props, key:index}
    const index = dataTrProps.index

    const dataUserProps = { ...dataTrProps, isUser: true }
    switch (dataTrProps.listType) {
      // master
      case 'vmBill':
        return <TrVmBill {...dataTrProps} />
      case 'vmInvoice':
        return <TrVmInvoice {...dataTrProps} />
      case 'ipHistory':
        return <TrIPOrder {...dataTrProps} />
      case 'userTransactions':
        return <TrUserTransaction {...dataTrProps} />
      case 'userIPHistories':
        return <TrIPOrder {...dataUserProps} />
      case 'userOrders':
        return <TrVmBill {...dataUserProps} />
      case 'users':
        return <TrUser {...dataTrProps} />
      case 'invoices':
        return <TrVPSInvoice {...dataTrProps} />
      case 'products':
        return <TrProduct {...dataTrProps} />
      case 'groups':
        return <TrGroup {...dataTrProps} />
      case 'cfsInvoices':
        return <TrCFSInvoice {...dataTrProps} />
      case 'userInvoices':
        return <TrCFSInvoice {...dataUserProps} />
      case 'userVmInvoices':
        return <TrVPSInvoice {...dataUserProps} />
      case 'allUsers':
      case 'businessUsers':
        return <TrCadminUser {...dataUserProps} />
      case 'individualUsers':
        return <TrEndUser {...dataUserProps} />
      case 'groupUsers':
        return <TrGroupUser {...dataUserProps} />
      case 'vadminGroupUsers':
        return <TrGroupUser {...dataTrProps} />
      default:
        return <tr key={index}></tr>
    }
  }
}
