import React, { Component } from 'react'
import FormGeneratorModal from '../../general/FormGeneratorModal'
import { language, ln, dir, swip, } from '../../../../utils/language'

export default class VMCommands extends Component {
  getTimeIntervel(epoch1, epoch2) {
    const date = epoch1 == 0? new Date(): new Date(epoch1)
    const interval = date - new Date(epoch2)
    let days = interval > 86400000? Math.floor(interval / 86400000): 0
    let hours = interval > 3600000? Math.floor(interval / 3600000) - days * 24 : 0
    let minutes = interval > 60000? Math.floor(interval / 60000) - days * 1440 - hours * 60: 0
    let seconds = Math.floor(interval / 1000) - days * 86400 - hours * 3600 - minutes * 60
    // return interval
    // return `${days} D ${hours} h ${minutes} m ${seconds} s`
    return (days== 0?'': `${days}D `) + (hours == 0?'':`${hours}h `)
    + (minutes == 0?'': `${minutes}m `) + (seconds == 0? '': `${seconds}s`)
  }
  render() {
    // console.log('VMCommands props:', this.props);
    const {vmbillId, invoiceId, hypResources, hypsLoading, isHypPinned,
      isPowerOk, vmId,
      xmlLoading, dumpxmlData, isProblem, isRenewNeeded,
      isVmDeleted, isVmPowered, isVmRenewed,
      deletevmLoading, powervmLoading, renewvmLoading,
      currentPowerState, powerActionRequest,
      pinLoading, unpinLoading, migrateLoading,
      retryLoading, isVm, createLoading, vmBrush,
      resetBrushLoading,
      hypervisorId, isVmOn,
      isMigrated, finilizeMigrateLoading, isMigratedFinilized,
      isVmInMigration,

    } = this.props
    // let currentPowerState =
    // powerSuccessState?
    //   powerSuccessState == 'poweron'? 'ON': powerSuccessState == 'shutdown'? 'OFF': false
    //   :
    //   this.props.currentPowerState
    // console.log('unpinLoading',unpinLoading, pinLoading);
    const newPowerState =
    currentPowerState == 'ON'? 'Off': currentPowerState == 'OFF'? 'On': false
    const powerAction = currentPowerState == 'ON'? 'shutdown': currentPowerState == 'OFF'? 'poweron': false
    const powerColor = currentPowerState == 'ON'? 'red': currentPowerState == 'OFF'? 'green': false
    console.log('powerAction:', currentPowerState, powerAction, powerActionRequest,);

    const {loadDumpXml, loadHyps, resetBrush,
      retryActionVm, pinVm, unpinVm, migrateVm, finalizeMigrateVm, createVm,
      deleteVm, renewVm, powerVm,
    } = this.props.handlers

    const migrateProps = {
      selectData: hypResources && hypResources.hyps?
      {hyp: hypResources.hyps
        .filter(hyp => hyp.id != hypervisorId).map(hyp => ({value: hyp.id, name: hyp.name}))
      }
      : {hyp: []},
      selectLoading: {hyp: hypsLoading},
    }
    console.log('migrate:', isHypPinned, hypervisorId, vmBrush, isMigrated, isMigratedFinilized);
    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">{ln('commands')}</h3>
          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool" data-widget="collapse">
              <i  className="fa fa-minus"></i>
            </button>
          </div>
        </div>
        {vmBrush && isVm &&
          <div className="box-body">
            <div className="progress" style={{height: 10}}>
              <div className="progress-bar" role="progressbar"
                aria-valuenow={`${Number((vmBrush.startedTimes.length * 100) / vmBrush.strokes.length)}%`}
                aria-valuemin="0" aria-valuemax="100"
                style=
                {{width: `${Number((vmBrush.startedTimes.length * 100) / vmBrush.strokes.length)}%`,
                float: 'left'}} >
              </div>
            </div>
            <table className="table">
              <tbody>
                {vmBrush.strokes.map(
                  (stroke, index) => (
                    <tr key={index} style={index < vmBrush.startedTimes.length?
                        {color:'black'}:{color: 'lightgrey'}}>
                      <td style={{paddingLeft: 20}}>{stroke}</td>
                      <td>
                        {
                          index<vmBrush.startedTimes.length
                          &&
                          (index == vmBrush.startedTimes.length - 1?
                            this.getTimeIntervel(0 , vmBrush.startedTimes[index])
                            :
                            this.getTimeIntervel(vmBrush.startedTimes[index + 1],
                              vmBrush.startedTimes[index])
                          )
                        }
                      </td>
                      <td>
                        {
                          index<vmBrush.startedTimes.length
                          &&
                          (index == vmBrush.startedTimes.length - 1 ?
                            <i aria-hidden="true" className="fa fa-spinner fa-spin" style={{color: 'teal'}} />
                            :<i aria-hidden="true" className="fa fa-check" style={{color: 'green'}} />)
                          }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        }
        {isVm &&
          <div className="box-body">

            {isPowerOk && !vmBrush &&
              // powerOn | shutdown
              <a className={`btn btn-app text-${powerColor}`} data-toggle="modal"
                disabled={powervmLoading && powerActionRequest != 'poweroff'}
                data-target={!powervmLoading && powerActionRequest != 'poweroff' && '.powerVm'}>
                {
                  powervmLoading && powerActionRequest != 'poweroff'?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-power-off"></i>
                }
                {ln(`power${newPowerState}`)}
              </a>
            }
            {isPowerOk && currentPowerState == 'ON' && !vmBrush &&
              <a className="btn btn-app" data-toggle="modal"
                disabled={powervmLoading && powerActionRequest != 'shutdown'}
                data-target={!powervmLoading && powerActionRequest != 'shutdown' && '.turnoffVm'}>
                {
                  powervmLoading && powerActionRequest != 'shutdown'?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-plug"></i>
                }
                {ln('turnOff')}
              </a>
            }
            { !vmBrush &&
              <a className="btn btn-app" data-toggle="modal"
                disabled={deletevmLoading}
                data-target={!deletevmLoading && (currentPowerState != 'ON'? '.deleteVm' : '.alarmDelete')}>
                {
                  deletevmLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-close"></i>
                }
                {ln('delete')}
              </a>
            }
            {isRenewNeeded && !vmBrush &&
              <a className="btn btn-app" data-toggle="modal"
                disabled={renewvmLoading}
                data-target={!renewvmLoading && '.renewVm'}>
                {
                  renewvmLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-refresh"></i>
                }
                {ln('renew')}
              </a>
            }
            {!vmBrush &&
              <a className="btn btn-app" data-toggle="modal" data-target=".dumpxml"
                onClick={()=> loadDumpXml(vmbillId)}>
                <i className="ion ion-code"></i> XML
              </a>
            }
            {isHypPinned && !vmBrush &&
              <a className="btn btn-app" data-toggle="modal"
                disabled={unpinLoading}
                data-target={!unpinLoading && '.unpinVm'}>
                {
                  unpinLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-caret-square-o-up"></i>
                }
                {ln('unpin')}
              </a>
            }
            {!isHypPinned && hypervisorId && !vmBrush &&
              <a className="btn btn-app" data-toggle="modal"
                disabled={pinLoading}
                data-target={!pinLoading && '.pinVm'}>
                {
                  pinLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-thumb-tack"></i>
                }
                {ln('pin')}
              </a>
            }
            {!isHypPinned && hypervisorId && !vmBrush &&
              !isVmInMigration &&

              <a className="btn btn-app" data-toggle="modal"
                disabled={migrateLoading}
                data-target={!migrateLoading && '.migrateVm'}
                onClick={() => loadHyps()}>
                {
                  migrateLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-share"></i>
                }
                {ln('migrate')}
              </a>
            }
            {
              !isHypPinned && hypervisorId &&
              !vmBrush &&
              isVmInMigration &&
              <a className="btn btn-app" data-toggle="modal"
                disabled={finilizeMigrateLoading}
                data-target={!finilizeMigrateLoading && '.finalizeMigrateVm'}
                >
                {
                  finilizeMigrateLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-share-square-o"></i>
                }
                {ln('finalizeMigrate')}
              </a>
            }
            {isProblem && vmBrush &&

              <a className="btn btn-app" data-toggle="modal"
                disabled={retryLoading}
                data-target={!retryLoading && '.retryActionVm'}>
                {
                  retryLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-repeat"></i>
                }
                {ln('retryAction')}
              </a>
            }
            {isProblem && vmBrush &&
              <a className="btn btn-app" data-toggle="modal"
                disabled={resetBrushLoading}
                data-target={!resetBrushLoading && '.resetBrushVm'}>
                {
                  resetBrushLoading?
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                  :
                  <i className="fa fa-times-circle-o"></i>
                }
                {ln('clearBrush')}
              </a>

            }
          </div>
        }
        {!isVm &&
          <div className="box-body">
            <a className="btn btn-app" data-toggle="modal"
              disabled={createLoading}
              data-target={!createLoading && '.createVm'}>
              {
                createLoading?
                <i className="fa fa-spin fa-circle-o-notch"></i>
                :
                <i className="fa fa-plus"></i>
              }
              {ln('createVM')}
            </a>
          </div>
        }

        <FormGeneratorModal buttonText='modalTitleRetryCreateVM' iconName="repeat" innerForm="retryActionVm"
          innerText="retryCreateVM"
          submitAction={retryActionVm} params={[vmbillId]}
          />
        <FormGeneratorModal buttonText='modalTitleClearVMBrush' iconName="times-cirlce-o" innerForm="resetBrushVm"
          innerText="sureToDeleteVMBrush"
          submitAction={resetBrush} params={[vmbillId]}
          />
        <FormGeneratorModal buttonText='modalTitlePinVM' iconName="thumb-tack" innerForm="pinVm"
          innerText="sureToPinVMToHyp"
          submitAction={pinVm} params={[vmbillId, hypervisorId]}
          />
        <FormGeneratorModal buttonText='modalTitleUnpinVM' iconName="caret-square-o-up" innerForm="unpinVm"
          innerText="sureToUnpinVMFromHyp"
          submitAction={unpinVm} params={[vmbillId]}
          />
        <FormGeneratorModal buttonText='modalTitleMigrateVM' iconName="share" innerForm="migrateVm"
          submitAction={migrateVm} params={[vmId]}
          {...migrateProps}
          />
        <FormGeneratorModal buttonText='modalTitleFinalizeMigrateVM' innerForm="finalizeMigrateVm"
          innerText="sureToFinalizeMigration"
          iconName="share-square-o"
          submitAction={finalizeMigrateVm} params={[vmbillId]}
          />
        <FormGeneratorModal buttonText='modalTitleDeleteVM' iconName="close" innerForm="deleteVm"
          innerText="sureToRemoveVM"
          submitAction={deleteVm} params={[vmbillId]}
          />
        <FormGeneratorModal buttonText='modalTitleVMIsON' innerForm="alarmDelete"
          isAlarm={true}
          innerText="cannotDeleteTurnedOFF"
          />
        <FormGeneratorModal buttonText='modalTitleRenewVM' iconName="refresh" innerForm="renewVm"
          innerText="sureToRenewVM"
          submitAction={renewVm} params={[vmbillId]}
          />
        <FormGeneratorModal buttonText='modalTitleCreateVM' iconName="plus" innerForm="createVm"
          innerText="sureToCreateVM"
          submitAction={createVm} params={[invoiceId]}
          />
        <FormGeneratorModal buttonText={swip('vmOf', `power${newPowerState}`)} iconName="power-off" innerForm="powerVm"
          innerText={`${ln('sureToPower')} ${swip('vmOf', `power${newPowerState}s`)}${ln('questionMark0')}`}
          submitAction={powerVm} params={[vmbillId, powerAction]}
          />
        <FormGeneratorModal buttonText='modalTitleTurnOffVM' iconName="plug" innerForm="turnoffVm"
          innerText="sureToTurnOffVM"
          submitAction={powerVm} params={[vmbillId, 'poweroff']}
          />

        <div className="modal fade dumpxml" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">{ln('showDumpXml')}</h4>
              </div>
              <div className="modal-body">
                {xmlLoading?
                  <div style={{margin: 20}}>
                    <i className="fa fa-spin fa-circle-o-notch" /> &nbsp;
                      Loading ...
                  </div>
                  :
                  dumpxmlData?
                  <div className="box-body">
                    <pre lang="xml">
                      {dumpxmlData.dumpXml}
                    </pre>
                  </div>
                  :
                  <div />
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
