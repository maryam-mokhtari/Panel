import React, { Component } from 'react'
import FormGeneratorModal from '../../general/FormGeneratorModal'
import Loading from '../../general/Loading'
import {loadBox} from '../../../../utils/box'
import {clearFormGeneratorModal} from '../../../../utils/form'
import { language, ln, dir } from '../../../../utils/language'
import { isArrayOK } from '../../../../utils/array'

export default class VMBackup extends Component {
  render() {
    const {
      backupLoading, backupHandlers,
      makeBackupLoading, deleteBackupLoading, restoreBackupLoading,
      vmbillId,
    } = this.props
    const {loadBackups, backup, deleteBackup, restoreBackup, } = backupHandlers
    let backups = this.props.backups
    if (!backups) {
      backups = []
    }
    return (


      <div className="box collapsed-box">
        <div className="box-header with-border">
          <h3 className="box-title box-name-collapse" data-widget="collapse"
            style={{cursor: 'pointer'}}
            onClick={() => loadBox(this.refs, true, loadBackups, vmbillId)}>{ln('backups')} &nbsp;
          </h3>
          <a
            href="#" className="product-title" data-toggle="modal" data-target={!makeBackupLoading && '.createBackup'}
            onClick={()=> clearFormGeneratorModal()}>
            <span className="label label-warning box-button" > {ln('createBackup')}
              &nbsp;
              {makeBackupLoading?
                <i className="fa fa-spin fa-circle-o-notch"></i>
                :
                <i className="fa fa-plus"></i>
              }
            </span>
          </a>
          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool" data-widget="collapse"
              onClick={() => loadBox(this.refs, false, loadBackups, vmbillId)}>
              <i ref="collapseBtn" className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="box-body" style={{display: 'none'}}>
          <ul className="products-list product-list-in-box">
            { backupLoading?
              <Loading />
              :
              isArrayOK(backups)?
              backups.map(backup => {
                return (

                  <li className="item" key={backup.id}>


                    <div className="product-info">

                      <span style={{color: '#35B9FA'}} className="product-title"> {backup.tag}</span>
                      <span className="product-description">{ln('createdAt')}: &nbsp; {new Date(backup.createdAt).toUTCString()}</span>
                      <span className="product-description">{ln('backupType')}: &nbsp; {backup.vmBackupType}</span>

                      <a href="#" className="product-title"
                        data-toggle="modal" data-target={deleteBackupLoading != backup.id && `.deleteBackup${backup.id}`}
                        onClick={()=> clearFormGeneratorModal()}>
                        <span className={`label label-danger pull-${dir('reverseAlign')} box-button`}>
                          {ln('delete')}
                          &nbsp;
                          {deleteBackupLoading == backup.id?
                            <i className="fa fa-spin fa-circle-o-notch"></i>
                            :
                            <i className="fa fa-close"></i>
                          }
                        </span>
                      </a>
                      <a href="#" className="product-title"
                        data-toggle="modal" data-target={restoreBackupLoading != backup.id && `.restoreBackup${backup.id}`}>
                        <span className={`label label-info pull-${dir('reverseAlign')} box-button`}>
                          {ln('restore')} &nbsp;
                          {restoreBackupLoading == backup.id?
                            <i className="fa fa-spin fa-circle-o-notch"></i>
                            :
                            <i className="fa fa-refresh"></i>
                          }
                        </span>
                      </a>
                    </div>
                    <FormGeneratorModal buttonText='modalTitleDeleteBackup' iconName="trash" innerForm={`deleteBackup${backup.id}`}
                      innerText={`${ln('sureToDeleteBackupFile')} ${backup.tag}${ln('questionMark')}`}
                      submitAction={deleteBackup} params={[backup.id]}
                      />
                    <FormGeneratorModal buttonText='modalTitleRestoreBackup' iconName="refresh" innerForm={`restoreBackup${backup.id}`}
                      innerText={`${ln('sureToDeleteRestoreFile')} ${backup.tag}${ln('questionMark')}`}
                      submitAction={restoreBackup} params={[vmbillId, backup.id]}
                      />
                  </li>
                )
              })
              :
              <div className="no-data">
                {ln('noDataIsAvailable')}
              </div>
            }
          </ul>


        </div>
      </div>
    )
  }
}
