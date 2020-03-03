import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { push } from 'react-router-redux'
import {
  authorizeSystem, enableAuthorization, disableAuthorization
} from '../../../../actions'
import Loading from '../../../components/general/Loading'
import { siteConfig } from '../../../../utils/siteConfig'
import {baseRoute} from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'

class AuthorizationPage extends Component {
  componentDidMount() {
    this.props.authorizeSystem()
  }
  active(status) {
    if(status) {
      this.props.enableAuthorization()
    }else {
      this.props.disableAuthorization()
    }
  }
  render() {
    const {
      authorizeData, authorizeLoading, systemAuthEnableLoading, systemAuthDisableLoading
    } = this.props

    const loadingLeft =  authorizeData && authorizeData.status ? '30px' : '4px'
    const loading = systemAuthEnableLoading | systemAuthDisableLoading
    const loadingColor = loading ? '#f4f4f4' : ''

    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('systemAuthorization')}
            <small>
              {ln('controlPanel')}
            </small>
          </h1>
          <ol className="breadcrumb">
            <li><i className="fa fa-dashboard"></i> <Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li className="active"> {ln('authorization')}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                  <h3 className="box-title title-name" data-widget="collapse" style={{ cursor: 'pointer' }}>
                    {ln('authorization')}
                  </h3>
                  <div className={`box-tools pull-${dir('reverseAlign')}`}>
                    <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                {authorizeLoading ?
                  <Loading />
                  : authorizeData &&
                  <div className="box-body">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-12">
                          <p className={`box-header user-box-header bg-${authorizeData.status ? 'success' : 'danger'}`}>
                            {ln('systemAuthorizationIsNow')}
                            {authorizeData.status ?
                              <span><strong className="text-green"> {ln('activated')} </strong>{ln('is')}</span>
                              :
                              <span><strong className="text-red"> {ln('deactivated')} </strong>{ln('is')}</span>
                            }.
                          </p>
                          <label className="switch" style={{direction: 'ltr'}}>
                            <i className={`fa ${loading&&'fa-circle-o-notch'} fa-spin switch-loading`}
                              style={{ left: loadingLeft }} />
                            <input type="checkbox" disabled={loading}
                              checked={authorizeData.status}
                              readOnly={true}
                              onClick={() => !loading && this.active(!authorizeData.status)}
                              />
                            <span className="slider round" style={{ backgroundColor: loadingColor }} ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    authorizeData, authorizeLoading, systemAuthEnableLoading, systemAuthDisableLoading
  } = state.masterEntities
  return {
    authorizeData, authorizeLoading, systemAuthEnableLoading, systemAuthDisableLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      authorizeSystem, enableAuthorization, disableAuthorization
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage)
