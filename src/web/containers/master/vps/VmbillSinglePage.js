import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadSingleVmbill, loadHyps,
  loadBackups, backup, deleteBackup, restoreBackup,
  loadDumpXml,
  deleteVm, renewVm, powerVm, createVm,
  pinVm, unpinVm, retryActionVm, migrateVm, finalizeMigrateVm, resetBrush,
  updateVmInvoice, loadVmInvoices,
  next, previous, setPage, changeSort, changePageSize, resetList,
} from '../../../../actions'
import { getNormalizedDigit, } from '../../../../utils/normalize'
import { getPeriodColor, } from '../../../../utils/color'
import { siteConfig, } from '../../../../utils/siteConfig'
import { getDate, getPDate, } from '../../../../utils/date'
import VMCommands from '../../../components/master/vps/VMCommands'
import VMBackup from '../../../components/master/vps/VMBackup'
import VMInvoices from '../../../components/master/vps/VMInvoices'
import Loading from '../../../components/general/Loading'
import FormGeneratorModal from '../../../components/general/FormGeneratorModal'
import {baseRoute} from '../../../../utils/route'
import {language, ln, dir} from '../../../../utils/language'

class VmbillSinglePage extends Component {
  componentDidMount() {
    this.props.loadSingleVmbill(this.props.vmbillId)
  }
  // -- Begin Polling
  startPoll() {
    this.timeout = setTimeout(() => this.props.loadSingleVmbill(this.props.vmbillId), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vmbillSingle !== nextProps.vmbillSingle) {
      clearTimeout(this.timeout)

      if (nextProps.vmbillSingle) {
        this.startPoll()
      }
    }
  }
  // -- End Polling
  render() {
    console.log('VmbillSinglePage props', this.props);
    const {vmbillSingleLoading, vmbillSingle, vmbillId, hypId,
      makeBackupLoading, deleteBackupLoading, restoreBackupLoading,
      backupLoading, backups,
      loadBackups, backup, deleteBackup, restoreBackup,
      hypResources, hypsLoading, isPinSucceed, isUnPinSucceed,
      xmlLoading, dumpxmlData,
      pinVm, unpinVm, migrateVm, finalizeMigrateVm, loadHyps, retryActionVm, loadDumpXml,
      deleteVm, renewVm, powerVm, resetBrush,
      isVmDeleted, isVmPowered, isVmRenewed,
      deletevmLoading, powervmLoading, renewvmLoading, powerActionRequest,
      pinLoading, unpinLoading, migrateLoading, createLoading, resetBrushLoading,
      retryLoading, createVm,
      loadVmInvoices, vmInvoicesLoading, vmInvoices, updateVmInvoice,
      next, previous, setPage, changeSort, changePageSize, resetList,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending,
      updateinvoiceLoading,
      isMigrated, finilizeMigrateLoading,isMigratedFinilized,
    } = this.props
    // let periodColor = 'aqua'
    if (vmbillSingle && vmbillSingle.lastInvoice && vmbillSingle.lastInvoice.recurringPeriod) {
      periodColor = getPeriodColor(vmbillSingle.lastInvoice.recurringPeriod)
    }
    let osName = vmbillSingle && vmbillSingle.os
    osName = osName && osName.replace('deb', 'Debian')
    osName = osName && osName.replace('rhel', 'CentOs')
    osName = osName && osName[0].toString().toUpperCase() + osName.substr(1)
    const handlers = {
      pinVm, unpinVm, migrateVm, finalizeMigrateVm, loadHyps, retryActionVm, loadDumpXml,
      deleteVm, renewVm, powerVm, createVm, resetBrush,
    }
    const backupHandlers = {
      loadBackups, backup, deleteBackup, restoreBackup,
    }
    const invoiceId = vmbillSingle && vmbillSingle.lastInvoice && vmbillSingle.lastInvoice.id
    const isExpired = vmbillSingle && vmbillSingle.lastInvoice && new Date(vmbillSingle.lastInvoice.to) < new Date()
    const isOverdue = vmbillSingle && vmbillSingle.lastInvoice && new Date(vmbillSingle.lastInvoice.dueDate) < new Date()
    const vmCommandProps = {vmbillId, hypId, handlers, hypResources, hypsLoading,
      isHypPinned: vmbillSingle && vmbillSingle.hypervisor && !isUnPinSucceed || isPinSucceed,
      isProblem: vmbillSingle && vmbillSingle.vm && vmbillSingle.vm.state == 'PROBLEM',
      isVm: vmbillSingle && vmbillSingle.vm && !isVmDeleted,
      isVmOn: vmbillSingle && vmbillSingle.vm && vmbillSingle.vm.state == 'ON' ,
      vmBrush: vmbillSingle && vmbillSingle.vm && vmbillSingle.vm.brush,
      vmId: vmbillSingle && vmbillSingle.vm && vmbillSingle.vm.id,
      isVmInMigration: vmbillSingle && vmbillSingle.vm && vmbillSingle.vm.vmMigrations
      && !vmbillSingle.vm.vmMigrations.every(item => item.vmMigrationStatus == 'SUCCESS'),

      currentPowerState: vmbillSingle && vmbillSingle.vm && vmbillSingle.vm.state,
      isRenewNeeded:
        vmbillSingle && vmbillSingle.lastInvoice &&
        (
          vmbillSingle.lastInvoice.paid && isExpired
          ||
          (!vmbillSingle.lastInvoice.paid
            && (vmbillSingle.lastInvoice.to || vmbillSingle.lastInvoice.from)) && isOverdue
        ),
      isPowerOk:
        vmbillSingle && vmbillSingle.vm
        && (vmbillSingle.vm.state == 'OFF' || vmbillSingle.vm.state == 'ON'),
      hypervisorId: vmbillSingle && vmbillSingle.vm && vmbillSingle.vm.hypervisor && vmbillSingle.vm.hypervisor.id,
      xmlLoading, dumpxmlData,
      isVmDeleted, isVmPowered, isVmRenewed,
      deletevmLoading, powervmLoading, renewvmLoading, powerActionRequest,
      pinLoading, unpinLoading, migrateLoading,
      retryLoading, invoiceId, createLoading,
      resetBrushLoading,
      isMigrated, finilizeMigrateLoading,isMigratedFinilized,
    }
    const listHandlers = {next, previous, setPage, changeSort, changePageSize, resetList, loadData: loadVmInvoices,}

    const backupProps = {backupLoading, backups, backupHandlers, hypId, vmbillId,
      makeBackupLoading, deleteBackupLoading, restoreBackupLoading,
    }
    const vmInvoicesProps = {vmInvoicesLoading, vmInvoices, vmbillId, dispatch,
      pageNumber, pageSize, sortColumn, isAscending, listHandlers,
      vmbillName: vmbillSingle && vmbillSingle.name, updateinvoiceLoading,
    }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('vmBill')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/vmbills`}>{ln('vmOrders')}</Link></li>
            <li className="active">{ln('vmBill')}</li>

          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-widget" style={{ marginBottom: 0 }}>
                <div className="box box-widget widget-user-2" style={{ marginBottom: 0 }}>
                  <div className="box-footer no-padding" style={{background: '#ecf0f5'}}>
                    {
                      //vmbillSingleLoading?
                      !vmbillSingle && vmbillSingleLoading?
                      <Loading />
                      :
                      vmbillSingle &&
                      <div className="row">
                        <div className="col-md-12">
                          <div className="box" style={{ marginBottom: 0 }}>
                            <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                              <h3 className="box-title title-name" data-widget="collapse" style={{cursor: 'pointer'}}>
                                <span className={`pull-${dir('align')} en-font`}>{vmbillSingle.name}</span>

                                &nbsp;&nbsp;
                                {(vmbillSingle.vm && !isVmDeleted) &&
                                  <small className={`label en-font bg-${vmbillSingle.vm.state == 'ON' ? 'green' : 'red'}`}>
                                    {vmbillSingle.vm.state}
                                  </small>
                                }
                              </h3>

                              <div className={`box-tools pull-${dir('reverseAlign')}`}>
                                <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>
                            </div>
                            <div className="box-body" style={{ background: 'white' }}>
                              <div className="inner-body">
                                <h4>
                                  {
                                    (vmbillSingle.vm && !isVmDeleted) && vmbillSingle.vm.nics &&
                                    vmbillSingle.vm.nics.filter(vm => vm.network.networkType == 'PUBLIC') &&
                                    vmbillSingle.vm.nics.filter(vm => vm.network.networkType == 'PUBLIC')[0].ipAddresses &&
                                    <span style={dir('reverseAlign') == 'right'? {marginRight: 50}: {marginLeft: 50}}>
                                      {vmbillSingle.vm.nics.filter(vm => vm.network.networkType == 'PUBLIC')[0].ipAddresses[0].ip4}
                                    </span>
                                  }

                                  <span className="vm-create">{ln('vmCreatedBefore')}:&nbsp;
                                    <span style={vmbillSingle.vmCreatedBefore?{color: 'green'}:{color: 'red'}}>
                                      {vmbillSingle.vmCreatedBefore? ln('yes'): ln('no')}
                                    </span>
                                  </span>

                                </h4>
                                <div>

                                  {vmbillSingle.lastInvoice && vmbillSingle.lastInvoice.user &&
                                    <h4 className="text-light-blue">
                                      <Link className="en-for-fa" to={`/${baseRoute.master}/user/${vmbillSingle.lastInvoice.user.id}`}>
                                        {vmbillSingle.lastInvoice.user.email}
                                      </Link>
                                    </h4>
                                  }
                                </div>
                                {vmbillSingle.vm && vmbillSingle.vm.hypervisor &&
                                  <div>
                                    <span className="text-grey">{ln('hypervisor')}: &nbsp; </span>
                                    <span className="text-blue">{vmbillSingle.vm.hypervisor.name}</span>
                                  </div>
                                }
                                {vmbillSingle.vm &&
                                  <div>
                                    <span className="text-grey">{ln('sysName')}: &nbsp; &nbsp;&nbsp; </span>
                                    <span className="text-blue">{vmbillSingle.vm.sysName}</span>
                                  </div>
                                }
                                <div style={{marginTop: 20}}>
                                  <span className="btn btn-social vm-label vm-os-label" >
                                    <span className={`vm-inner-label vm-inner-label-${language.key}`}>
                                      {ln('os')}
                                    </span>
                                    <span className={`en-font vm-inner-text-${language.key}`}>
                                      {osName}
                                    </span>
                                  </span>
                                  <span className="btn btn-social vm-label">
                                    <span className={`vm-inner-label vm-inner-label-${language.key}`}>
                                      {ln('cpu')}
                                    </span>
                                    <span className={`vm-inner-text-${language.key}`}>
                                      {vmbillSingle.cpuCores} {ln('cores')}
                                    </span>
                                  </span>
                                  <span className="btn btn-social vm-label">
                                    <span className={`vm-inner-label vm-inner-label-${language.key}`}>
                                      {ln('ram')}
                                    </span>
                                    <span className={`vm-inner-text-${language.key}`}>
                                      {vmbillSingle.ram} {ln('gb')}
                                    </span>
                                  </span>
                                  <span className="btn btn-social vm-label">
                                    <span className={`vm-inner-label vm-inner-label-${language.key}`}>
                                      {ln('disk')}
                                    </span>
                                    <span className={`vm-inner-text-${language.key}`}>
                                      {vmbillSingle.primaryDisk} {ln('gb')}
                                    </span>
                                  </span>
                                </div>
                                {vmbillSingle.lastInvoice &&
                                  <div className="row" style={{marginTop: 5, marginBottom: 10,}}>
                                    <div className="col-lg-4 col-md-6 text-grey">
                                      <div className="row">
                                        <div className="col-sm-4 col-xs-6">{ln('period')}:</div>
                                        <div className="col-sm-8 col-xs-6">
                                          <span className={`label  text-${periodColor}`}
                                            style={{fontSize: '100%'}}>
                                            {ln(vmbillSingle.lastInvoice.recurringPeriod.toLowerCase())}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-4 col-xs-6">{ln('price')}:</div>
                                        <div className="col-sm-8 col-xs-6 text-green">
                                          {vmbillSingle.lastInvoice.totalPrice?
                                            getNormalizedDigit(vmbillSingle.lastInvoice.totalPrice, true)
                                            :
                                            '-'
                                          }
                                          &nbsp;
                                          {ln('irr')}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-4 col-xs-6">{ln('paid')}:</div>
                                        <div className="col-sm-8 col-xs-6">
                                          {
                                            vmbillSingle.lastInvoice.paid?
                                            <i className="fa fa-check text-green" />
                                            :
                                            <i className="fa fa-close text-red" />
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-8 col-md-6 text-grey">
                                      <div className="row">
                                        <div className="col-sm-4 col-xs-6">{ln('from')}:</div>
                                        <div className="col-sm-8 col-xs-6 text-blue">
                                          {vmbillSingle.lastInvoice.from ? getPDate(vmbillSingle.lastInvoice.from): '-'}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-4 col-xs-6">{ln('to')}:</div>
                                        <div className="col-sm-8 col-xs-6 text-blue">
                                          {vmbillSingle.lastInvoice.to ? getPDate(vmbillSingle.lastInvoice.to): '-'}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-4 col-xs-6">{ln('createdAt')}:</div>
                                        <div className="col-sm-8 col-xs-6 text-blue">
                                          {vmbillSingle.lastInvoice.createdAt ? getPDate(vmbillSingle.lastInvoice.createdAt): '-'}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-4 col-xs-6">{ln('paidAt')}:</div>
                                        <div className="col-sm-8 col-xs-6 text-blue">
                                          {vmbillSingle.lastInvoice.approvedAt ? getPDate(vmbillSingle.lastInvoice.approvedAt): '-'}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                }
                                <div className="row" style={{marginTop: 15,}}>
                                  <div className="col-md-10 col-sm-12">
                                    {(vmbillSingle.vm && !isVmDeleted) &&
                                      <table className={`table table-striped responsive-${language.key}-table`}>
                                        <thead>
                                          <tr>
                                            <th style={{width: 10,}}>No.</th>
                                            <th>{ln('networkName')}</th>
                                            <th>{ln('networkType')}</th>
                                            <th>{ln('iPAddresses')}</th>
                                            <th>{ln('macAddress')}</th>

                                          </tr>
                                        </thead>
                                        <tbody>
                                          {vmbillSingle.vm && vmbillSingle.vm.nics &&
                                            vmbillSingle.vm.nics.map((nic, index) => (
                                              <tr key={index}>
                                                <td data-title={ln('number')}>{index + 1}</td>
                                                <td data-title={ln('networkName')}>{nic.network && nic.network.name}</td>
                                                <td data-title={ln('networkType')}>
                                                  {nic.network && nic.network.networkType && ln(nic.network.networkType.toLowerCase())}
                                                </td>
                                                <td data-title={ln('ipAddresses')}>{nic.ipAddresses && nic.ipAddresses.map(
                                                    (ip, i)=>ip.ip4+ (i == nic.ipAddresses.length - 1?'':', ')
                                                  )}
                                                </td>
                                                <td data-title={ln('macAddress')}>{nic.macAddress}</td>
                                              </tr>
                                            ))
                                          }
                                        </tbody>
                                      </table>
                                    }
                                  </div>
                                </div>
                              </div>
                              <VMCommands {...vmCommandProps} />
                              <VMInvoices {...vmInvoicesProps} />
                              {vmbillSingle && vmbillSingle.vm &&
                                <VMBackup {...backupProps} />
                              }
                            </div>
                            <FormGeneratorModal buttonText='modalTitleCreateBackup' iconName="plus" innerForm="createBackup"
                              innerText="sureToMakeBackupFile"
                              submitAction={backup} params={[vmbillId]}
                              />

                            <FormGeneratorModal buttonText='modalTitleUpdateVMLastInvoice' iconName="pencil" innerForm="updateVmInvoice"
                              submitAction={updateVmInvoice} params={[invoiceId]}
                              defaultValues={vmbillSingle && vmbillSingle.lastInvoice
                                && {
                                  'totalPrice': vmbillSingle.lastInvoice.totalPrice * 10000,
                                  'from': vmbillSingle.lastInvoice.from,
                                  'to': vmbillSingle.lastInvoice.to,
                                  'dueDate': vmbillSingle.lastInvoice.dueDate,
                                  'paid': vmbillSingle.lastInvoice.paid,
                                }}
                                selectData={{paid: [{'value': true, name: ln('paid')}, {'value': false, name: ln('unpaid')}, ]}}
                            />
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {vmbillId, hypId} = ownProps.params
  const {
    vmbillSingleLoading,
    vmbillSingle,
    hypResources, hypsLoading,
    isPinSucceed, isUnPinSucceed,
    xmlLoading, dumpxmlData,
    backupLoading, backups,
    isVmDeleted, isVmPowered, isVmRenewed,
    deletevmLoading, powervmLoading, renewvmLoading,
    pinLoading, unpinLoading, migrateLoading, createLoading,
    powerActionRequest, resetBrushLoading,
    retryLoading,
    vmInvoicesLoading, vmInvoices, updateinvoiceLoading,
    makeBackupLoading, deleteBackupLoading, restoreBackupLoading,
    isMigrated, finilizeMigrateLoading,isMigratedFinilized,
  } = state.masterEntities
  const {pageNumber, pageSize, sortColumn, isAscending, } = state.list
  return {
    vmbillSingleLoading,
    vmbillId, hypId,
    vmbillSingle,
    isPinSucceed, isUnPinSucceed,
    hypResources, hypsLoading,
    xmlLoading, dumpxmlData,
    backupLoading, backups,
    isVmDeleted, isVmPowered, isVmRenewed,
    deletevmLoading, powervmLoading, renewvmLoading,
    pinLoading, unpinLoading, migrateLoading, createLoading,
    resetBrushLoading,
    powerActionRequest, updateinvoiceLoading,
    retryLoading, vmInvoicesLoading, vmInvoices,
    pageNumber, pageSize, sortColumn, isAscending,
    makeBackupLoading, deleteBackupLoading, restoreBackupLoading,
    isMigrated, finilizeMigrateLoading,isMigratedFinilized,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadSingleVmbill, loadHyps, loadDumpXml,
    loadBackups, backup, deleteBackup, restoreBackup,
    retryActionVm,
    pinVm, unpinVm, migrateVm, finalizeMigrateVm, resetBrush,
    deleteVm, renewVm, powerVm, createVm,
    updateVmInvoice, loadVmInvoices,
    next, previous, setPage, changeSort, changePageSize, resetList,
  }, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(VmbillSinglePage)
