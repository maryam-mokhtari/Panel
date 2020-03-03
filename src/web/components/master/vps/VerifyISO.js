import React, { Component } from 'react'
import Loading from '../../general/Loading'
import { language, ln, dir } from '../../../../utils/language'

export default class VerifyISO extends Component {
  render() {
    const {validateISO,
      //validateLoading,
      isomd5Loading, isoMd5, hypId, isoId, md5Info,
    } = this.props
    const isPreVerified = md5Info && md5Info.md5 == isoMd5
    const background = isPreVerified? '#F1FEF2' : '#FEF1F1'
    const color = isPreVerified? 'green': 'red'
    const icon = isPreVerified? 'check': 'close'
    console.log('validate:', this.props, md5Info, md5Info && isoMd5);
    console.log('md5Info4:', md5Info);
    return (
      <div className={`modal fade verifyISO${isoId}`} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title">{ln('verifyChecksum')} Md5</h4>

            </div>
            <form role="form" className="form-horizontal">
              <div className="modal-body">
                {isomd5Loading?
                  <Loading />
                  :
                  md5Info?
                  <div className="box-body">
                    <div className="form-group">
                      <label className="col-sm-2 control-label">{ln('uploadedMd5')}</label>
                      <div className="col-sm-9">
                        <input className="form-control" type="text"
                          readOnly="true"
                          value={isoMd5}
                          style={{background,}} />
                      </div>
                      <i className={`col-sm-1 fa fa-${icon}`} style={{paddingTop: 10, color,}} />
                    </div>

                    <div className="form-group">
                      <label className="col-sm-2 control-label">{ln('realMd5')}</label>
                      <div className="col-sm-9">
                        <input className="form-control" type="text"
                          readOnly="true"
                          value={md5Info.md5}
                          style={{background,}} />
                      </div>
                      <i className={`col-sm-1 fa fa-${icon}`} style={{paddingTop: 10, color,}} />
                    </div>

                  </div>
                  :
                  <div />
                }

              </div>
            </form>
            <div className="modal-footer">
              <button type="button" className="btn btn-default pull-left" data-dismiss="modal">
                {ln('close')}
              </button>
              <button type="button" id="submitButton" className="btn btn-primary"  data-dismiss="modal"
                onClick={() => validateISO(hypId, isoId)}
                >
                {ln('confirm')} &nbsp;
                <i className="fa fa-check" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
