import React, { Component } from 'react'
import Loading from '../general/Loading'
import {language, ln, dir} from '../../../utils/language'
import { isUserInRole, getUserRole, ADMIN, } from '../../../utils/role'
import { isArrayOK } from '../../../utils/array'

export default class UserAuthorization extends Component {
  active(status) {
    if (status) {
      this.props.handlers.enableUserAuthorization(this.props.userId)
    } else {
      this.props.handlers.disableUserAuthorization(this.props.userId)
    }
  }
  async accept() {
    if (!this.props.setAuthDocStatusLoading) {
      await this.props.handlers.setAuthDocStatus('ACCEPTED', this.props.userId, this.refs.description.value)
    }
    this.props.handlers.loadUserAuthorization(this.props.userId)
  }
  reject() {
    if (!this.props.setAuthDocStatusLoading && this.refs.description && this.isValid('description')) {
      this.props.handlers.setAuthDocStatus('REJECTED', this.props.userId, this.refs.description.value)
    }
  }
  isProfileOk(user) {
    return user && user.name && user.family && user.email && user.terms
      && user.profile
      && user.profile.address
      && user.profile.customerType && user.profile.nationalId
      && user.profile.phone && user.profile.postalCode
      && user.profile.registerNo && user.profile.company
      && user.profile.companyNationalCode
      && user.profile.province && user.profile.city
      && user.mobileNumber
  }
  isValid(refName) {
    console.log('isValid', refName, this.refs);
    if (this.refs[refName].value) {
      this.refs[refName+'Div'].classList.remove('has-error')
      return true
    } else {
      this.refs[refName+'Div'].classList.add('has-error')
      return false
    }
  }
  render() {
    console.log('userAuthorization props', this.props);
    const { userId, userAuthorizationLoading, userAuthorizationData, handlers,
      documentsLoading, userDocuments, userData,
      userAuthorizationEnableLoading, userAuthorizationDisableLoading,
      // authDocStatus
      authDocStatusData, authDocStatusLoading,
      setAuthDocStatusLoading,
    } = this.props
    let user = this.props.user && isArrayOK(this.props.user) && this.props.user[0]
    console.log('userAuthorization props', this.props);
    const loadingLeft = userAuthorizationData && userAuthorizationData.status? '30px':'4px'
    const loading = userAuthorizationEnableLoading | userAuthorizationDisableLoading
    const loadingColor = loading? '#f4f4f4' : ''
    return (
      <div id="authorization" className="tab-pane">
        <div className="box user-profile-box">
          <div className="box user-box-body">
            <div className="box-body">
              {authDocStatusLoading || userAuthorizationLoading || documentsLoading?
                <Loading />
                :
                <div>
                  {authDocStatusData &&
                    <div className="row">
                      <div className="col-md-12">
                        {(userAuthorizationData && authDocStatusData.status == 'ACCEPTED') &&
                          <div className={`box-header user-box-header bg-${userAuthorizationData.status?'success':'danger'}`}>
                            <div className="row">
                              <div className="col-lg-2 col-md-3 col-sm-10 col-xs-9" style={{paddingTop: 10}}>
                                {ln('userIsNow')}
                                {userAuthorizationData.status?
                                  <span><strong className="text-green"> {ln('activated')} </strong>{ln('is')}</span>
                                  :
                                  <span><strong className="text-red"> {ln('deactivated')} </strong>{ln('is')}</span>
                                }.
                              </div>
                              <div>
                                {(isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData)
                                  || isUserInRole(ADMIN.authorization, userData)) &&
                                  <label className="switch" style={{direction: 'ltr', margin: 0}}>
                                    <i className={`fa ${loading && 'fa-circle-o-notch'}
                                      fa-spin switch-loading`} style={{left: loadingLeft}} />
                                    <input type="checkbox" disabled={loading}
                                      checked={userAuthorizationData.status}
                                      readOnly={true}
                                      onClick={() => !loading && this.active(!userAuthorizationData.status)}
                                      />
                                    <span className="slider round" style={{backgroundColor: loadingColor}} ></span>
                                  </label>
                                }
                              </div>
                            </div>
                          </div>
                        }
                        <div className="row" style={{padding: 10}}>
                          {
                            userDocuments != null && userDocuments.filter(item => item.name && item.id).map((item, index) => (
                              <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                <div className="description-block box-status">
                                  <a className="en-font" style={{cursor: 'pointer'}}
                                    href={`/cfs/rest/authDocument/${item.id}/downloadDocument?authtoken=${localStorage.getItem('csrf_token')}`}
                                    ref="downloadLink"
                                    download
                                    >{item.name}</a>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  }
                {authDocStatusData && authDocStatusData.status == 'REJECTED' &&
                  <p className={`box-header user-box-header bg-danger`} style={{marginBottom: 10}}>
                    {ln('userIsRejected')}.
                    <br/>
                    {ln('rejectReason')}: &nbsp;
                    <span className="text-red">
                      {authDocStatusData.description}
                    </span>
                  </p>
                }
                {authDocStatusLoading == false && authDocStatusData && authDocStatusData.status != 'ACCEPTED' &&
                  isUserInRole(ADMIN.zerouser, user) &&
                  (this.isProfileOk(user)?
                    (isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData)
                    || isUserInRole(ADMIN.authorization, userData)
                  ) &&
                    <div>
                      <div className="row" style={{padding: 10}}>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" style={{padding: 10}}>
                          {ln('description')}
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-11 col-xs-12" ref="descriptionDiv">
                          <textarea id="description" ref="description" className="form-control input-form">

                          </textarea>
                        </div>
                      </div>
                      <div className="row" style={{padding: 10}}>
                        <div className="col-lg-1 col-md-2 col-sm-2 col-xs-4">
                          <button className="btn btn-success" style={{width: 75}}
                            onClick={() => this.accept()}
                            >{ln('accept')}</button>
                        </div>
                        <div className="col-lg-1 col-md-2 col-sm-2 col-xs-4">
                          <button className="btn btn-danger" style={{width: 75}}
                            onClick={() => this.reject()}
                            >{ln('doReject')}</button>
                        </div>
                      </div>
                    </div>
                    :
                    !isUserInRole(ADMIN.enduser, user) &&
                    <p className="box-header user-box-header bg-danger" style={{marginBottom: 10}}>
                      {ln('userProfileProblem')}.

                    </p>
                  )
                }
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
