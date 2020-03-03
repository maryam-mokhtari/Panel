import React, { Component } from 'react'
import VerifyISO from './VerifyISO'
import FormGeneratorModal from '../../general/FormGeneratorModal'
import Loading from '../../general/Loading'
import {loadBox} from '../../../../utils/box'
import {clearFormGeneratorModal} from '../../../../utils/form'
import { language, ln, dir } from '../../../../utils/language'
import { isArrayOK } from '../../../../utils/array'

export default class ISO extends Component {
  render() {
    let {isoLoading, isos, hypId, formFields, md5Info,
      deleteISOLoading,
      validateLoading,
      isoUploadLoading,
      isoHandlers, verifyData, isomd5Loading,
    } = this.props
    const {loadISO, uploadISO, deleteISO, getISOMd5, validateISO, } = isoHandlers
    if (!isos) {
      isos = []
    }
    return (


      <div className="box collapsed-box">
        <div className="box-header with-border">
          <h3 className="box-title box-name-collapse" data-widget="collapse"
            style={{cursor: 'pointer'}}
            onClick={() => loadBox(this.refs, true, loadISO)}>{ln('iso')} &nbsp;
          </h3>
          <a
            href="#" className="product-title" data-toggle="modal" data-target={!isoUploadLoading && '.uploadISO'}
            onClick={()=> clearFormGeneratorModal()}>
            <span className="label label-warning box-button" > {ln('upload')}
              &nbsp;
              {isoUploadLoading?
                <i className="fa fa-spin fa-circle-o-notch"></i>
                :
                <i className="fa fa-plus"></i>
              }
            </span>
          </a>
          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool" data-widget="collapse"
              onClick={() => loadBox(this.refs, false, loadISO)}>
              <i ref="collapseBtn" className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="box-body" style={{display: 'none'}}>
          <ul className="products-list product-list-in-box">
            {
              isoLoading?
              <Loading />
              :
              isArrayOK(isos)?
              isos.map(iso=> {
                const verifyProps = {verifyData, validateISO,
                  validateLoading,
                  isomd5Loading,
                  hypId, isoMd5: iso.md5, isoId: iso.id, md5Info}
                  return (

                    <li className="item" key={iso.id}>

                      <div className="product-info">

                        <span style={{color: '#35B9FA'}} className="product-title"> {iso.name}
                        </span>
                        <span style={{paddingLeft: 20, color: '#ccc'}}>
                          {iso.size}&nbsp;
                          {iso.size && 'GB'}
                        </span>
                        <a href="#" className="product-title"
                          data-toggle="modal" data-target={deleteISOLoading != iso.id && `.deleteISO${iso.id}`}
                          onClick={()=> clearFormGeneratorModal()}>
                          <span className={`label label-danger pull-${dir('reverseAlign')} box-button`}>
                            {ln('delete')}
                            &nbsp;
                            {deleteISOLoading == iso.id?
                              <i className="fa fa-spin fa-circle-o-notch"></i>
                              :
                              <i className="fa fa-close"></i>
                            }
                          </span>
                        </a>
                        <a href="#" className="product-title"
                          style={iso.status && {cursor: 'default'}}
                          data-toggle={!iso.status && 'modal'} data-target={validateLoading != iso.id && `.verifyISO${iso.id}`}
                          onClick={()=> validateLoading != iso.id && !iso.status && getISOMd5(hypId, iso.id)}
                          >
                          <span className={`label label-${iso.status? 'success disabled': 'info'} pull-${dir('reverseAlign')} box-button`}
                            style={iso.status && {opacity: 0.7}}
                            >
                            {iso.status? ln('verified'): ln('verify')}
                            &nbsp;
                            {validateLoading == iso.id?
                              <i className="fa fa-spin fa-circle-o-notch"></i>
                              :
                              <i className="fa fa-check"></i>
                            }
                          </span>
                        </a>
                        <span className="product-description" style={{color: '#8396AA'}}>{iso.checksumMd5}
                        </span>
                        <span className="product-description">
                          {iso.url}
                        </span>
                      </div>
                      <FormGeneratorModal buttonText='modalTitleDeleteISO' iconName="trash" innerForm={`deleteISO${iso.id}`}
                        innerText={`${ln('sureToDeleteISOFile')} ${iso.name}${ln('questionMark')}`}
                        submitAction={deleteISO} params={[hypId, iso.id]}
                        />
                      <VerifyISO {...verifyProps} />
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
