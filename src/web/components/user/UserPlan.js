import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import { isArrayOK } from '../../../utils/array'
import { language, ln, dir } from '../../../utils/language'
import { getNormalizedDigit, getNormedBytes, } from '../../../utils/normalize'
import { getPDate, } from '../../../utils/date'
import { getDoughnutData, } from '../../../utils/doughnut'
import { siteConfig } from '../../../utils/siteConfig'
import Loading from '../general/Loading'
import DoughnutChart from '../general/DoughnutChart'
import profileImage from '../../../../design/dist/img/mtn/profileImage.png'

const Wrapper = (props) => <div id="UserPlan" className="tab-pane">
  <div className="box user-profile-box">
    <div className="box user-box-body">
      <div className="box-body" style={{ display: '' }}>
        {props.children}
      </div>

    </div>
  </div>
</div>

export default class UserPlan extends Component {
  render() {
    const {
      userPlanLoading, userPlanData,
      usersCountLoading,
    } = this.props
    console.log('UserPlan', this.props);
    if (userPlanLoading || userPlanData && usersCountLoading) {
      return <Wrapper><Loading /></Wrapper>
    }
    if (!userPlanData) {
      return <Wrapper />
    }
    const { plan, memberCount, groupName, groupQuota, cfsPlanGroupUsers, adminUser, } = userPlanData
    const { name, jsonInfo, featureInfo } = plan
    const { quota, plan_type, type, member_count, faname } = JSON.parse(jsonInfo)
    const { en_description = '', fa_description = '' } = featureInfo ? JSON.parse(featureInfo) : {}
    let usersCount = Array.isArray(cfsPlanGroupUsers) ? cfsPlanGroupUsers.length :
      this.props.usersCount ? this.props.usersCount : 0
    const quotaDoughnutData = getDoughnutData(
      groupQuota, quota,
      ln('remainedQuota'),
      ln('quota') + ' ' + ln('gb'),
      true
    )
    const userDoughnutData = getDoughnutData(
      usersCount, member_count,
      ln('remainedUserCount'),
      ln('userCount')
    )
    const isInvoicePaid = adminUser.lastPaidInvoice && adminUser.lastPaidInvoice.invoiceStatus == 'PAID'
    return (
      <Wrapper>
        <div className="box" style={{ marginBottom: 0, borderTop: 0 }}>
          <div className={`box-header with-border bg-${siteConfig[siteConfig.key].headerBackground}`}>
            <h3 className="box-title title-name" data-widget="collapse" style={{ cursor: 'pointer' }}>
              <span className={`pull-${dir('align')}`}>{faname || name}</span>
              &nbsp;&nbsp;
              <small className={`label bg-${isInvoicePaid ? 'green' : 'red'}`} style={{ fontWeight: 'normal' }}>
                {isInvoicePaid ?
                  ln('planIsActive')
                  :
                  ln('planIsInactive')
                }
              </small>
            </h3>

            <div className={`box-tools pull-${dir('reverseAlign')}`}>
              <button type="button" className="btn btn-box-tool text-gray" data-widget="collapse">
                <i className="fa fa-minus"></i>
              </button>

            </div>
          </div>
          <div className="box-body">


            <div className="box box-warning box-solid">
              <div className={`box-body plan-yours bg-mtn-${isInvoicePaid ? 'enabled' : 'disabled'}`}>
                <div className="row box-body-row">
                  <div className="col-lg-1 col-md-2 col-sm-3">
                    {/*<img className="user-img" src="https://www.gravatar.com/avatar/3454dfeaed122bdb7f890db15f7b767c?d=blank&amp;s=0"*/}
                    <img className="" src={profileImage}
                      style={{
                        left: 10,
                        height: 60,
                      }} />
                  </div>
                  <div className="col-xs-8 plan-info">

                    <p>
                      <span>{ln('adminName')}:&nbsp;</span>
                      <span>{adminUser.name} {adminUser.family}</span>
                    </p>

                    <p>
                      <span>{ln('email')}:&nbsp;</span>
                      <span><a className="en-for-fa" href={`mailto:${adminUser.email}`}>{adminUser.email}</a></span>
                    </p>

                  </div>
                </div>

                <div className="media-body">
                  <div className="box-body" >
                    <div className="row plan-box-body-responsive">
                      <div className="col-lg-6 col-md-12 col-sm-12 plan-info">
                        {adminUser.lastPaidInvoice &&

                          <p>
                            <span>{ln('invoiceStatusTitle')}:&nbsp;</span>
                            <span>{ln(adminUser.lastPaidInvoice.invoiceStatus.toLowerCase())}</span>
                          </p>
                        }

                        <p>
                          <span>{ln('groupName')}:&nbsp;</span>
                          <span>{groupName}</span>
                        </p>

                        <p>
                          <span>{ln('period')}:&nbsp;</span>
                          <span>{ln(plan_type.toLowerCase())}</span>
                        </p>

                        <p>
                          <span>{ln('activationDate')}:&nbsp;</span>
                          <span>{adminUser.lastPaidInvoice ? getPDate(adminUser.lastPaidInvoice.from) : '-'}</span>
                        </p>

                        <p>
                          <span>{ln('endDate')}:&nbsp;</span>
                          <span>{adminUser.lastPaidInvoice ? getPDate(adminUser.lastPaidInvoice.to) : '-'}</span>
                        </p>

                        <p>
                          <span>{ln('description')}:&nbsp; </span>
                          <span>{eval(language.key + '_description')} </span>
                        </p>

                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 plan-box-body-responsive" style={{ textAlign: 'center', marginBottom: 30 }}>
                        <DoughnutChart data={quotaDoughnutData} className="doughnut-responsive" />
                        {/*<div>
                      {ln('quota')}:&nbsp;
                      <span>
                        {getNormedBytes(groupQuota)}&nbsp;
                        {ln('of')}&nbsp;
                        {getNormedBytes(quota)}
                      </span>
                    </div>*/}
                        <div style={{ fontSize: '15px', fontWeight: 'bolder' }} className={`${language.key == 'en' ? 'responsive-en-doughnutChart-text' :''}`}>
                          {ln('remainedQuota')}:&nbsp;
                      <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                            {getNormedBytes(quota - groupQuota)}&nbsp;
                        {ln('of')}&nbsp;
                        {getNormedBytes(quota)}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 plan-box-body-responsive" style={{ textAlign: 'center', fontWeight: 'bolder' }}>
                        <DoughnutChart data={userDoughnutData} className=" doughnut-responsive" />
                        {ln('userCount')}:&nbsp;
                    <span>
                          <span style={{ fontSize: '14px', fontWeight: 'normal' }}> {usersCount} {ln('of')} {member_count}</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
