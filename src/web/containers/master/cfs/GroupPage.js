import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { push } from 'react-router-redux'
import {
  loadGroup
} from '../../../../actions'
import {baseRoute} from '../../../../utils/route'
import { siteConfig } from '../../../../utils/siteConfig'
import { language, ln, dir } from '../../../../utils/language'
import { isArrayOK } from '../../../../utils/array'
import { isUserInRole, getUserRole, ADMIN, } from '../../../../utils/role'
import Loading from '../../../components/general/Loading'

class GroupPage extends Component {
  componentDidMount() {
    this.props.loadGroup(this.props.groupId);
  }
  render() {
    const {
      groupLoading, groupData, userData,
    } = this.props
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('group')}
            <small>
              {ln('controlPanel')}
            </small>
          </h1>
          <ol className="breadcrumb">
            <li><i className="fa fa-dashboard"></i> <Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.master}/groups`}>{ln('groups')}</Link></li>
            <li className="active">{ln('group')}</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
                  <h3 className="box-title title-name" data-widget="collapse" style={{ cursor: 'pointer' }}>{ln('groupDetails')}</h3>
                  <div className={`box-tools pull-${dir('reverseAlign')}`}>
                    <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                {groupLoading ?
                  <Loading />
                  :
                  isArrayOK(groupData)?
                  <div className="box-body">
                    <div className="col-md-9 col-xs-12">
                      <div className="row">
                        <label className="col-lg-4 col-xs-6 control-label group-title">{ln('groupName')}</label>
                        <div className="col-lg-4 col-xs-6 text-blue group-value">{groupData[0].groupName}</div>
                      </div>
                      <div className="row">
                        <label className="col-lg-4 col-xs-6 control-label group-title">{ln('memberCount')}</label>
                        <div className="col-lg-4 col-xs-6 text-blue group-value">{groupData[0].memberCount}</div>
                      </div>
                      <div className="row">
                        <label className="col-lg-4 col-xs-6 control-label group-title">{ln('adminUser')}</label>
                        <div className="col-lg-4 col-xs-6 text-blue group-value">{groupData[0].adminUser.username}</div>
                      </div>
                      <div className="row">
                        <label className="col-lg-4 col-xs-6 control-label group-title">{ln('planName')}</label>
                        <div className="col-lg-4 col-xs-6 text-blue group-value">{groupData[0].plan.name}</div>
                      </div>
                    </div>
                    {isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData) &&
                      <div className="col-md-3 col-xs-12" style={{textAlign: dir('reverseAlign'), padding: 10}}>
                        <button className="btn btn-default white-button" onClick={() => {
                            this.props.dispatch(push(`/${baseRoute.master}/group/upgrade/${this.props.groupId}`))
                          }}>
                          {ln('upgradeGroup')} &nbsp;
                          <i className="fa fa-caret-square-o-up"></i>
                        </button>

                      </div>
                    }
                  </div>
                  :
                  groupLoading == false &&
                  <div className="box-body">
                    {ln('groupNotFound')}
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
    groupLoading, groupData
  } = state.masterEntities
  const {userData, userDataLoading} = state.generalEntities
  const { groupId } = ownProps.params
  return {
    userData, userDataLoading,
    groupLoading, groupData, groupId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch, ...bindActionCreators({
      loadGroup
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)
