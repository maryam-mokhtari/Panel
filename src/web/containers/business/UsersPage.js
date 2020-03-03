import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadGroupUsers, resendInvitation, deleteUser, loginAsClient, changeUserQuota, activateUser, deactivateUser,
  addAdminToGroup,
  next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
} from '../../../actions'
import GeneralList from '../../components/list/GeneralList'
import FormGeneratorModal from '../../components/general/FormGeneratorModal'
import ProgressBar from '../../components/general/ProgressBar'
import Loading from '../../components/general/Loading'
import {baseRoute} from '../../../utils/route'
import {cfs} from '../../../utils/path'
import { clearFormGeneratorModal, } from '../../../utils/form'
import { siteConfig, } from '../../../utils/siteConfig'
import { isArrayOK, } from '../../../utils/array'
import { language, ln, dir } from '../../../utils/language'

import {getNormedBytes, } from '../../../utils/normalize'
import {percentColor, } from '../../../utils/color'
import clouddownloadicon from '../../../../design/icons/cloud-download.png'
import userIcon from '../../../../design/icons/user.png'

export const InfoBox = ({value, totalValue, icon, text1, text2, text3, text4, isNormed=false }) => (
  //usersCount ones totalCapacity ones
  <div className="row bg-light-yellow" style={{margin: '3px 0px', fontSize: '0.9em'}}>
    <div className="col-xs-3 side-icon">
      <i className={`fa fa-${icon}`} />
    </div>
    <div className="col-xs-9">
      <div>
        {ln(text1)}
      </div>
      <div>
        {getNormedBytes(value, isNormed)}&nbsp;
        {ln(text2)}
      </div>
      <div className="row">
        <div className="bg-black side-text" style={{float: 'left',
          width: (100 -  Math.round((value/totalValue)*100)) + '%'}}>
        </div>
        <div className={`bg-yellow side-text`} style={{float: 'left',
          width:  Math.round((value/totalValue)*100) + '%'}}>
        </div>
      </div>
      <div style={{padding: '2px 0px', fontSize: '0.9em'}}>
        {ln(text3)}&nbsp;
        {getNormedBytes(totalValue, isNormed)}&nbsp;
        {ln(text4)}
        {ln('is')}
      </div>
    </div>
  </div>
)

export const BoxInfo = ({value, totalValue, icon, text1, text2, text3, text4, isNormed=false }) => (
  <div className="info-box bg-light-yellow" style={{height:'60px', minHeight: '60px'}}>
    <span className="info-box-icon">
      {/*<i className={`fa fa-${icon}`} style={{fontSize: '0.8em'}}></i>*/}
      {icon == 'cloud-download' ? <img src={clouddownloadicon} alt="" style={{ width: '55px', height: '55px', marginTop: '-24px'}}/>:
        <img src={userIcon} alt="" style={{ width: '60px', height: '60px', marginTop: '-37px' }} />}
      </span>

    <div className="info-box-content" style={{marginRight: '60px'}}>
      <span className="info-box-text" style={{fontSize: '12px'}}>{ln(text1)}</span>
      <span className="info-box-number">
        {getNormedBytes(value, isNormed)}&nbsp;
        {ln(text2)}
      </span>

      <div className="progress">
        <div className="progress-bar" style={{width: Math.round((value/totalValue)*100) + '%'}}>
        </div>
      </div>
      <span className="progress-description">
        {ln(text3)}&nbsp;
        {getNormedBytes(totalValue, isNormed)}&nbsp;
        {ln(text4)}
        {/*ln('is')*/}
      </span>
    </div>
  </div>
)

class UsersPage extends Component {
  componentDidUpdate(nextProps) {
    if (this.props.isLoginAsClientSuccess != nextProps.isLoginAsClientSuccess
      && this.props.isLoginAsClientSuccess) {
        location.assign(`/${cfs}`)
    }
  }
  render() {
    const {
      addAdminLoading,
      addAdminToGroup,
      isAdminInGroup,
      usersGroupLoading, resendLoading, deleteUserLoading, loginAsClientLoading, changeUserQuotaLoading, activateUserLoading, deactivateUserLoading,
      count,
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      loadGroupUsers, resendInvitation, deleteUser, loginAsClient, changeUserQuota, activateUser, deactivateUser,
      data,
      next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
      planGroupData, planGroupLoading,
    } = this.props
    const listHandlers = {loadData: loadGroupUsers, dispatch, next, previous, setPage, changeSort,
      changePageSize, resetList, first, last,  setSearchParams, clearSearchParams,
    }
    const tableHeaders = ['email', 'quota', 'active', 'registered', 'settings',]
    const sortColumns = ['email', 'quota', 'active', ]
    const searchSelectData = {
      active: [{ name: 'Yes', value: true }, { name: 'No', value: false }],
    }

    const generalListProps = {isLoading: usersGroupLoading, data,
      count,
      tableHeaders, sortColumns, listType: 'groupUsers',
      listHandlers,
      trHandlers: {resendInvitation, deleteUser, loginAsClient, changeUserQuota, activateUser, deactivateUser, },
      trLoadings: {resendLoading, deleteUserLoading, loginAsClientLoading, changeUserQuotaLoading, activateUserLoading, deactivateUserLoading,},
      dispatch,
      pageNumber, pageSize, sortColumn, isAscending, searchParams,
      isSidebarCollapsed: false,
      searchItemDisplayName: 'email', searchItemType: 'email',
      searchInnerForm: 'searchGroupUsers',
      searchSelectData,
      isHeaderAlreadyPrepared: true,
    }
    console.log('group UsersPage', this.props);
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('users')}
            {/*{siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }*/}
          </h1>
          <ol className="breadcrumb">

            {/*<div className={`direct-chat-success pull-${dir('align')}`} style={{marginTop: -15}}>
              <div className={`direct-chat-msg ${dir('reverseAlign')} direct-chat-success sm-hide`}>
                {isAdminInGroup &&
                  <div className="direct-chat-text">{ln('groupMembership')}</div>
                }
              </div>
            </div>*/}

            <li>
              <Link to={`/${baseRoute.business}`}>{ln('home')}</Link>
            </li>
            <li className="active">{ln('users')}</li>
          </ol>
          <div className="row" style={{background: '#eee'}}>
            <div className="col-lg-4 col-md-6" style={{paddingTop: 10}}>
              <Link role="button" className="btn btn-default white-button"
                to={`/${baseRoute.business}/newuser`}>
                <span>{ln('newUserInvitation')} &nbsp;</span>
                <i className="fa fa-user-o"></i>

              </Link>

              <button className="btn btn-default white-button"
                disabled={addAdminLoading || isAdminInGroup}
                data-toggle="modal"
                data-target={!addAdminLoading && '.changeUserQuota'}
                >
                {ln('addAdmin')} &nbsp;
                {addAdminLoading?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  <i className="fa fa-user-plus" />
                }
              </button>
            </div>
            <div className="col-lg-8 col-md-6">
              {planGroupLoading?
                <Loading />
                :
                isArrayOK(planGroupData) &&
                <div>
                  <div className="col-lg-5 col-lg-offset-2">
                    <BoxInfo value={count} totalValue={planGroupData[0].memberCount}
                      text1="usersCount" text2="ones" text3="totalCapacity" text4="ones"
                      icon="user"
                       />
                  </div>
                  <div className="col-lg-5">
                    <BoxInfo
                      value={planGroupData[0].groupQuota}
                      totalValue={JSON.parse(planGroupData[0].plan.jsonInfo).quota}
                      text1="quota" text2="" text3="accessedQuota" text4=""
                      isNormed={true}
                      icon="cloud-download"
                       />
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-lg-12">

              <div className="box">
                <div className="box-header" style={{ paddingBottom: 0 }}>
                  <h3 className="box-title">
                    {ln('manageUsers')}
                  </h3>
                  {/*planGroupLoading != false?
                    <i className="fa fa-spin fa-circle-o-notch"
                      style={{marginLeft: 20, marginRight: 20, fontSize: '1em', }}
                      />
                    :
                    isArrayOK(planGroupData) &&
                    <span className={`text-${siteConfig[siteConfig.key].baseColor} xs-hide`}
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        fontWeight: 600,
                      }}>
                      {ln('groupName')}: &nbsp;
                      {planGroupData[0].groupName}
                    </span>
                  */}
                </div>
                <GeneralList {...generalListProps} />

              </div>
            </div>
          </div>
        </section>
        <FormGeneratorModal buttonText="addAdmin" iconName="user-plus"
          innerForm="changeUserQuota"
          submitAction={addAdminToGroup} params={[isArrayOK(planGroupData) && planGroupData[0].id, ]}
        />
        {data && data.map((item, index) =>
          <FormGeneratorModal buttonText="changeQuota" iconName="pencil-square-o"
            key={index}
            formId={`changeUserQuota${item.id}`} innerForm="changeUserQuota"
            submitAction={changeUserQuota} params={[item.user && item.user.id]}
            defaultValues={{quota: Math.round(item.quota * 100000 / (1024 * 1024 * 1024)) / 100000 }} // round by 5 digits
            />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    usersGroupLoading, resendLoading, deleteUserLoading, loginAsClientLoading,
    changeUserQuotaLoading, activateUserLoading, deactivateUserLoading,
    data, count,
    addAdminLoading, isAdminInGroup,
    planGroupData, planGroupLoading,
    isLoginAsClientSuccess,
  } = state.businessEntities
  const {userData, userDataLoading} = state.generalEntities
  const {pageNumber, pageSize, sortColumn, isAscending, searchParams, } = state.list
  return {
    usersGroupLoading, resendLoading, deleteUserLoading, loginAsClientLoading, changeUserQuotaLoading, activateUserLoading, deactivateUserLoading,
    data, count,
    pageNumber, pageSize, sortColumn, isAscending, searchParams,
    addAdminLoading, isAdminInGroup,
    planGroupData, planGroupLoading,
    userData,
    isLoginAsClientSuccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    loadGroupUsers, resendInvitation, deleteUser, loginAsClient, changeUserQuota, activateUser, deactivateUser,
    addAdminToGroup,
    next, previous, setPage, changeSort, changePageSize, resetList, first, last, setSearchParams, clearSearchParams,
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
