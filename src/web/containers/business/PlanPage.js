import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {
  loadPlans, buyPlan, showMessage, upgradePlan,
} from '../../../actions'
import { isValid, clear } from '../../../utils/form'
import { baseRoute } from '../../../utils/route'
import { siteConfig } from '../../../utils/siteConfig'
import { isArrayOK, strintToIntegerFunc } from '../../../utils/array'
import { language, ln, dir } from '../../../utils/language'
import { getNormalizedDigit, getNormedBytes, } from '../../../utils/normalize'
import { getPDate, } from '../../../utils/date'
import Loading from '../../components/general/Loading'


class PlanPage extends Component {
  async buyPlan(adminId, planId, hasPlan) { //planMinMemberCount) {
    if (hasPlan) {
      await this.props.upgradePlan(adminId, planId)
    } else if (isValid(this.refs, 'groupName')) { //& isValid(this.refs, 'memberCount')) {
      await this.props.buyPlan(this.refs.groupName.value, adminId, planId)
    }
    // -- this.refs.memberCount.value,

    // if (Number(this.refs.memberCount.value) < planMinMemberCount ) {
    //   this.props.showMessage(ln('memberCountOverFlowed'))
    // } else {
    //   await this.props.buyPlan(this.refs.groupName.value, this.refs.memberCount.value, adminId, planId)
    // }

    if (this.props.isPlanSuccess) {
      this.refs.planSuccess.classList.remove('hide')
      this.refs.planSuccess.classList.add('plan-success')
    }
  }
  componentDidMount() {
    this.props.loadPlans()
    document.getElementsByTagName('body')[0].classList.remove('sidebar-collapse')
  }
  search(input, plansGroupRenumbering) {
    plansGroupRenumbering && plansGroupRenumbering.length > 0 && plansGroupRenumbering.map(item => {
      console.log('plansGroupRenumbering.map(item => {', item.name, input.name, item.number, input.number, (item.name == input.name && item.number == input.number));
      return (item.name == input.name && item.number == input.number)
    })
  }
  sortPlansData(plansData) {
    let plansGroupRenumbering = [];
    plansData.forEach(plan => {
      console.log('plansData.map(plan => {');
      const { priceInfo, jsonInfo, name, id } = plan;
      const { quota, plan_type, member_count, faname } = JSON.parse(jsonInfo);

      switch (faname) {
        case 'طرح ۱':
          if (!this.search({ name: 'طرح ۱', number: 1 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۱', number: 1 });
        case 'طرح ۲':
          if (!this.search({ name: 'طرح ۲', number: 2 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۲', number: 2 });
        case 'طرح ۳':
          if (!this.search({ name: 'طرح ۳', number: 3 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۳', number: 3 });
        case 'طرح ۴':
          if (!this.search({ name: 'طرح ۴', number: 4 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۴', number: 4 });
        case 'طرح ۵':
          if (!this.search({ name: 'طرح ۵', number: 5 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۵', number: 5 });
        case 'طرح ۶':
          if (!this.search({ name: 'طرح ۶', number: 6 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۶', number: 6 });
        case 'طرح ۷':
          if (!this.search({ name: 'طرح ۷', number: 7 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۷', number: 7 });
        case 'طرح ۸':
          if (!this.search({ name: 'طرح ۸', number: 8 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۸', number: 8 });
        case 'طرح ۹':
          if (!this.search({ name: 'طرح ۹', number: 9 }, plansGroupRenumbering))
            plansGroupRenumbering.push({ name: 'طرح ۹', number: 9 });

      }
      console.log('plansGroupRenumbering is : ', plansGroupRenumbering);
    })
  }

  sortPlans(a, b) {
    const obj1 = a.jsonInfo;
    const obj2 = b.jsonInfo;
    const jsonObj1 = JSON.parse(obj1);
    const jsonObj2 = JSON.parse(obj2);

    // const {  faname } = JSON.parse(jsonInfo);
    // const {  jsonInfo, } = b;
    // const { faname } = JSON.parse(jsonInfo);
    let aValue = strintToIntegerFunc(jsonObj1.faname);
    let bValue = strintToIntegerFunc(jsonObj2.faname);
    console.log('obj1 and obj2 fname and int values : ', jsonObj1.faname, aValue, jsonObj2.faname, bValue);
    if (aValue < bValue)
      return -1;
    if (aValue > bValue)
      return 1;
    return 0;
  }
  render() {
    const isFa = language.key == 'fa'

    console.log('PlanPage', this.props);
    const {
      loadPlans, buyPlan, upgradePlan,
      userData, userDataLoading,
      plansData, plansLoading, buyPlanLoading,
      planGroupData, planGroupLoading,
      usersCount,
    } = this.props
    const hasPlan = isArrayOK(planGroupData) && userData.lastPaidInvoice

    let sortedArray = null;
    if (plansData) {
      sortedArray = plansData.sort(function (planA, planB) {
        function strintToIntegerFunc(str) {
          switch (str) {
            case 'طرح ۱':
              return 1;
            case 'طرح ۲':
              return 2;
            case 'طرح ۳':
              return 3;
            case 'طرح ۴':
              return 4;
            case 'طرح ۵':
              return 5;
            case 'طرح ۶':
              return 6;
            case 'طرح ۷':
              return 7;
            case 'طرح ۸':
              return 8;
            case 'طرح ۹':
              return 9;
          }
        }
        const jsonplanA = planA.jsonInfo;
        const jsonplanB = planB.jsonInfo;
        const jsonPlanA = JSON.parse(jsonplanA);
        const jsonPlanB = JSON.parse(jsonplanB);

        let planAValue = strintToIntegerFunc(jsonPlanA.faname);
        let planBValue = strintToIntegerFunc(jsonPlanB.faname);

        if (planAValue < planBValue)
          return -1;
        if (planAValue > planBValue)
          return 1;
        return 0;
      });
    }
    // { sortedArray && console.log('sorted last plansData ', sortedArray); }
    // { plansData && this.sortPlansData(plansData); }
    return (
      <div>
        <section className="content-header">
          <h1>

            {ln('plans')}&nbsp;
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.business}`}>{ln('home')}</Link></li>
            <li className="active">{ln('plan')}</li>
          </ol>
        </section>
        {plansLoading || userDataLoading ?
          <Loading />
          :
          <section className="content" style={{ direction: ln('direction') }}>
            <div className="row docs-premium-template">
              <div className="col-lg-12">


                <div className="callout callout-success hide" ref="planSuccess">
                  <a className={`pull-${dir('reverseAlign')} plan-close`} href="#" data-toggle="tooltip"
                    onClick={() => this.refs.planSuccess.classList.add('plan-hide')}>×</a>
                  <h4>{ln('billPayment')}</h4>
                  {ln('billPaymentMSG1')}
                  <Link to={`/${baseRoute.business}/invoices`} className="plan-label">{ln('invoices')}</Link>
                  {ln('referTo')}
                </div>
                {!hasPlan &&
                  <div className="row" style={{ marginBottom: 20 }}>
                    <div className="col-md-6 col-sm-12">
                      <label className={`pull-${dir('align')} plan-title-${language.key}`}>{ln('groupName')}</label>
                      <div className="col-lg-4 col-md-6 col-sm-12" ref="groupNameDiv">
                        <input className="form-control search-field box-white" ref="groupName"
                          readOnly={true}
                          value={userData && userData.profile ? userData.profile.company : ''}
                          onChange={() => isValid(this.refs, 'groupName')} />
                        <span ref="groupNameErrorIcon" className="fa fa-close  form-control-feedback hide" style={{ marginLeft: 10 }}></span>
                      </div>
                    </div>
                    {/*
                    <div className="col-md-6 col-sm-12">
                      <label className={`pull-${dir('align')} plan-title-${language.key}`}>{ln('memberCount')}</label>
                      <div className="col-lg-4 col-md-6 col-sm-12" ref="memberCountDiv">
                        <input className="form-control" type="number" ref="memberCount" onChange={() => isValid(this.refs, 'memberCount')} />
                        <span ref="memberCountErrorIcon" className="fa fa-close  form-control-feedback hide" style={{marginLeft: 10}}></span>
                      </div>
                    </div>
                    */}
                  </div>
                }

                {isArrayOK(plansData) && plansData.map(plan => {
                  const { priceInfo, jsonInfo, name, id } = plan
                  const { quota, plan_type, member_count, faname } = JSON.parse(jsonInfo)
                  const isCurrentPlan = hasPlan && name == planGroupData[0].plan.name
                  let isUpperPlan = false
                  if (hasPlan && planGroupData[0].plan) {
                    const currentPlanInfo = JSON.parse(planGroupData[0].plan.jsonInfo)
                    const isMemberLess = currentPlanInfo.member_count <= member_count
                    const isQuotaLess = currentPlanInfo.quota <= quota
                    const isPeriodLess =
                      plan_type == 'MONTH' && (currentPlanInfo.plan_type == 'MONTH') ||
                      plan_type == 'TMONTH' && (currentPlanInfo.plan_type == 'MONTH' || currentPlanInfo.plan_type == 'TMONTH') ||
                      plan_type == 'SMONTH' && (currentPlanInfo.plan_type == 'MONTH' || currentPlanInfo.plan_type == 'TMONTH' || currentPlanInfo.plan_type == 'SMONTH') ||
                      plan_type == 'YEAR' && (currentPlanInfo.plan_type == 'MONTH' || currentPlanInfo.plan_type == 'TMONTH' || currentPlanInfo.plan_type == 'SMONTH' || currentPlanInfo.plan_type == 'YEAR')

                    if (isMemberLess && isQuotaLess && isPeriodLess) {
                      isUpperPlan = true
                    }
                    console.log('isUpperPlan', faname, isMemberLess, isQuotaLess, isPeriodLess);
                  }
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-4" key={plan.id}>
                      <div className={`box box-warning ${isCurrentPlan && 'box-dark-green'}`}>
                        {buyPlanLoading == id &&
                          <div className="box-body plan-loading">
                            <i className="fa fa-spin fa-spinner"></i>
                          </div>
                        }
                        <div className={`box-body
                              ${hasPlan && !isUpperPlan && !isCurrentPlan && 'plan-disabled'}
                              plan-fix-height
                              `}>
                          <h4 className={`plan-header text-white ${isCurrentPlan && 'bg-dark-green'}`} dir="auto">
                            {isCurrentPlan && ln('yourPlan') + ': '}{language.key == 'fa' ? (faname || name) : name}
                          </h4>
                          <div className="media-body">

                            <div className="box-body" style={{ display: 'flex', flexDirection: 'column', lineHeight: '30px', fontSize: '14px' }}>

                              <div>
                                <span >{ln('quota')}:</span>
                                <span className={`plan-label`}>{getNormedBytes(quota)}</span>
                              </div>

                              <div>
                                <span>{ln('userCount')}:</span>
                                <span className={`plan-label`}>{member_count}</span>
                              </div>

                              <div>
                                <span>{ln('period')}:</span>
                                <span className={`plan-label`}>{ln(plan_type.toLowerCase())}</span>
                              </div>


                              {isCurrentPlan &&
                                <div>

                                  <div style={{ disply: 'flex' }}>
                                    <span>{ln('activationDate')}:</span>
                                    <span className={`plan-label`}>{userData.lastPaidInvoice ? getPDate(userData.lastPaidInvoice.from) : '-'}</span>
                                  </div>

                                  <div style={{ disply: 'flex' }}>
                                    <span>{ln('endDate')}:</span>
                                    <span className={`plan-label`}>{userData.lastPaidInvoice ? getPDate(userData.lastPaidInvoice.to) : '-'}</span>
                                  </div>

                                </div>
                              }
                            </div>

                            <p>
                              {((!hasPlan || isUpperPlan) && !isCurrentPlan) &&
                                <button className="btn bg-light-yellow text-white"
                                  disabled={buyPlanLoading || isCurrentPlan}
                                  onClick={() => userData && this.buyPlan(userData.id, id, hasPlan)
                                    //member_count)
                                  }
                                >
                                  {hasPlan ? ln('upgradePlan') : ln('buyPlan')}
                                  &nbsp;
                                  </button>
                              }
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  )
                }
                )}

              </div>
            </div>
          </section>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    plansData, plansLoading, buyPlanLoading, isPlanSuccess,
    planGroupData, planGroupLoading,
    usersCount,
  } = state.businessEntities
  const { userData, userDataLoading } = state.generalEntities
  console.log('userData', userData);
  return {
    userDataLoading, userData, plansData, plansLoading, buyPlanLoading, isPlanSuccess,
    planGroupData, planGroupLoading,
    usersCount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadPlans, buyPlan, showMessage, upgradePlan,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanPage)
