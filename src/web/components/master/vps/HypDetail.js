import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import HypChart from './HypChart'
import ISO from './ISO'
import Commands from './Commands'
import QueueItems from './QueueItems'
import FormGeneratorModal from '../../general/FormGeneratorModal'
import {siteConfig} from '../../../../utils/siteConfig'
import {percentColor, } from '../../../../utils/color'
import {baseRoute} from '../../../../utils/route'
import {clearFormGeneratorModal} from '../../../../utils/form'
import {language, ln, dir} from '../../../../utils/language'

export default class HypDetail extends Component {
  render() {
    let {hyp, isSingle, commandLoading, isCommandSuccess, handlers, isoHandlers,
      isoLoading, isos, hypUsages, hypsUsageLoading,
      hypId, dequeueLoading,
      deleteISOLoading,
      isomd5Loading,
      result, serviceAndType,
      updatepasswordLoading, validateLoading,
      deleteHypLoading,
      isoUploadLoading,
      md5Info,
    } = this.props

    const cpuPercent = Math.round((hyp['usedCpu'] / (hyp['totalCpu'] * 3)) * 100)
    const inUseCpuPercent = Math.round((hyp['inUseCpu'] / (hyp['totalCpu'] * 3)) * 100)
    const diskPercent = Math.round((hyp['usedDisk'] / hyp['totalDisk']) * 100)
    const inUseDiskPercent = Math.round((hyp['inUseDisk'] / hyp['totalDisk']) * 100)
    const ramPercent = Math.round((hyp['usedRam'] / hyp['totalRam']) * 100)
    const inUseRamPercent = Math.round((hyp['inUseRam'] / hyp['totalRam']) * 100)
    const cpuColor = percentColor(hyp['usedCpu'], 3 * hyp['totalCpu'])
    const diskColor = percentColor(hyp['usedDisk'], hyp['totalDisk'])
    const ramColor = percentColor(hyp['inUseRam'], hyp['totalRam'])

    const chartProps = {hypUsages, hypsUsageLoading, hypId: hyp.id}

    const display = 'block'

    const commandProps = {hyp, commandLoading, isCommandSuccess, handlers,
      result, serviceAndType
    }

    const isoProps = {isoLoading, isos, isoHandlers, hypId,
      validateLoading,
      isoUploadLoading,
      deleteISOLoading,
      isomd5Loading, md5Info,
    }
    const queueProps = {queueItems: hyp.queueItems, handlers, dequeueLoading,}
    return (


      <div className="row"  >

        <div className="col-md-12">
          <div className="box box-widget">

            <div className="box box-widget widget-user-2">

              <div className="box-footer no-padding" style={{background: '#ecf0f5'}}>



                <div className="row">
                  <div className="col-md-12">
                    <div className="box" style={{ marginBottom: 0 }}>
                      <div className={`box-header with-border bg-${siteConfig[siteConfig.key].baseColor}-active`}>
                        <h3 className="box-title title-name" data-widget="collapse" style={{cursor: 'pointer'}}>
                          <span className={`pull-${dir('align')} en-font`}>{hyp['name']}</span>
                          &nbsp;&nbsp;
                          <small className={`label en-font bg-${hyp['state'] == 'READY'? 'green' : hyp['state'] == 'GONE'? 'red': 'orange'}`}>{hyp['state']}</small>
                        </h3>

                        <div className={`box-tools pull-${dir('reverseAlign')}`}>
                          <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                            <i className="fa fa-minus"></i>
                          </button>
                          <div className="btn-group">
                            <button type="button" className="btn btn-box-tool text-gray dropdown-toggle" data-toggle="dropdown">
                              <i className="fa fa-wrench"></i>
                            </button>
                            <ul className="dropdown-menu" role="menu" style={dir('align') == 'right'? {left: 0, right: 'auto'}:{}}>
                              <li>
                                <a href="#"></a>
                              </li>
                              <li><Link to={`/${baseRoute.master}/hyp/${hyp.id}/vmbills`}>
                                <i className="fa fa-list text-blue"></i>
                                {ln('showVMOrdersList')}</Link></li>
                              <li className="divider"></li>
                              <li><a href="#" data-toggle="modal"
                                data-target={!updatepasswordLoading && `.updatePassword${hyp.id}`}
                                onClick={()=> clearFormGeneratorModal()}
                                >
                                {updatepasswordLoading?
                                  <i className="fa fa-spin fa-circle-o-notch"></i>
                                  :
                                  <i className="fa fa-unlock-alt text-orange"></i>
                                }
                                {ln('updatePassword')}</a></li>
                              <li className="divider"></li>
                              <li>
                                <a href="#" data-toggle="modal" data-target={!deleteHypLoading && `.deleteHyp${hyp.id}`}>
                                  {deleteHypLoading?
                                    <i className="fa fa-spin fa-circle-o-notch"></i>
                                    :
                                    <i className="fa fa-times text-red"></i>
                                  }
                                  {ln('removeHypervisor')}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="box-body" style={{ display, background: 'white' }}>
                        <h4 className="ip-address">
                          {hyp['ip-address']}
                          {!isSingle &&
                            <Link role="button" to={`/${baseRoute.master}/hyp/${hyp.id}`} className={`btn btn-box-tool pull-${dir('reverseAlign')}`}>
                              {ln('moreDetails')}&nbsp; <i className={`fa fa-arrow-circle-${dir('reverseAlign')}`}></i>
                          </Link>
                        }
                      </h4>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="chart">
                            <HypChart {...chartProps} />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <p className="text-center">
                            <strong>{ln('resources')}</strong>
                          </p>

                          <div className="progress-group">
                            <span className="progress-text">{ln('cpu')}</span>
                            <span className="progress-number"><b>{hyp['usedCpu']}</b>/{hyp['totalCpu'] * 3} {ln('cores')}</span>

                            <div className="progress sm">
                              <div className={`progress-bar progress-bar-${cpuColor}`} style={{ width: inUseCpuPercent + '%' }}></div>
                              <div className={`progress-bar progress-bar-${cpuColor}-light`} style={{ width: (cpuPercent - inUseCpuPercent) + '%' }}></div>
                            </div>
                          </div>

                          <div className="progress-group">
                            <span className="progress-text">{ln('ram')}</span>
                            <span className="progress-number"><b>{hyp['inUseRam']}</b>/{hyp['totalRam']} {ln('gb')}</span>

                            <div className="progress sm">
                              <div className={`progress-bar progress-bar-${ramColor}`} style={{ width: inUseRamPercent + '%' }}></div>
                              <div className={`progress-bar progress-bar-${ramColor}-light`} style={{ width: (ramPercent - inUseRamPercent) + '%' }}></div>
                            </div>
                          </div>
                          <div className="progress-group">
                            <span className="progress-text">{ln('disk')}</span>
                            <span className="progress-number"><b>{hyp['usedDisk']}</b>/{hyp['totalDisk']} {ln('gb')}</span>

                            <div className="progress sm">
                              <div className={`progress-bar progress-bar-${diskColor}`} style={{ width: inUseDiskPercent + '%' }}></div>
                              <div className={`progress-bar progress-bar-${diskColor}-light`} style={{ width: (diskPercent - inUseDiskPercent) + '%' }}></div>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>

                    <FormGeneratorModal buttonText='modalTitleUpdatePass' iconName="pencil"
                      formId={`updatePassword${hyp.id}`} innerForm="updatePassword"
                      submitAction={handlers.hypUpdatePassword} params={[hyp.id]}
                      />

                    <FormGeneratorModal buttonText='modalTitleRemoveHype' iconName="trash" innerForm={`deleteHyp${hyp.id}`}
                      innerText={`${ln('sureToDeletehyp')} ${hyp.name}${ln('questionMark')}`}
                      submitAction={handlers.deleteHyp} params={[hyp.id]}
                      />
                    {isoHandlers &&
                      <FormGeneratorModal buttonText='modalTitleUploadISO' iconName="plus" innerForm="uploadISO"
                        submitAction={isoHandlers.uploadISO} params={[hyp.id]}
                        />
                    }

                    <div className="box-footer" style={{display}}>
                      <div className="row" style={{paddingBottom: 10}}>
                        {hyp['status'] && hyp['status'].map((vmStatus, index) => (
                          <div key={index} className="col-md-2 col-sm-6">
                            <div className="description-block box-status">
                              <span className="description-percentage text-grey">{vmStatus.name.replace('_', ' ')}</span>
                              <h5 className="description-header text-green"></h5>
                              <h5 className="description-header text-green" style={{ fontSize: '0.95em' }}>
                                {vmStatus.count?
                                  <Link to={`/${baseRoute.master}/hyp/${hyp.id}/vmbills/${vmStatus.name.substr(vmStatus.name.indexOf('_') + 1)}`}>
                                    {vmStatus.count}
                                  </Link>
                                  : '0'
                                }
                              </h5>
                              <span className="description-text text-green"></span>
                            </div>
                          </div>
                        ))}
                      </div>


                      { isSingle &&
                        <div>
                          <div className="box-footer" style={{display}}>
                            { hyp.queueItems && hyp.queueItems.length ?
                              <QueueItems {...queueProps} />
                              :
                              <i/>
                            }
                          </div>

                          <div className="box-footer" style={{padding: 20,
                              borderTop: '2px solid #eee', display,}}>
                              <Commands {...commandProps} />

                          </div>

                          <div className="box-footer" style={{display}}>
                            <ISO {...isoProps} />
                          </div>
                        </div>
                      }

                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    )
  }
}
