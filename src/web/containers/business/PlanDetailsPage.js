import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {
  loadPlans, buyPlan, showMessage, upgradePlan,
} from '../../../actions'
import {isValid, clear} from '../../../utils/form'
import {baseRoute} from '../../../utils/route'
import {isArrayOK} from '../../../utils/array'
import {language, ln, dir} from '../../../utils/language'
import {getNormalizedDigit, getNormedBytes, } from '../../../utils/normalize'
import {getPDate, } from '../../../utils/date'
import {getDoughnutData, } from '../../../utils/doughnut'
import { siteConfig, } from '../../../utils/siteConfig'
import Loading from '../../components/general/Loading'
import DoughnutChart from '../../components/general/DoughnutChart'
import LineChart from '../../components/general/LineChart'
import UserPlan from '../../components/user/UserPlan'


class PlanDetailsPage extends Component {
  componentDidMount() {
    document.getElementsByTagName('body')[0].classList.remove('sidebar-collapse')
  }

  render() {
    const isFa = language.key == 'fa'

    console.log('PlanDetailsPage', this.props);
    const {
      userData, userDataLoading,
      planGroupData, planGroupLoading,
      usersCount,
      usersCountLoading,
    } = this.props
    return (
      <div>
        <section className="content-header">
          <h1>

            {ln('planInfo')}&nbsp;
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.business}`}>{ln('home')}</Link></li>
            <li className="active">{ln('planInfo')}</li>
          </ol>
        </section>
        <section className="content" style={{direction: ln('direction')}}>
          <div className="row docs-premium-template">
            <div className="col-lg-12">
              <div className="col-sm-12">
                <UserPlan
                  userPlanLoading={planGroupLoading}
                  userPlanData={isArrayOK(planGroupData)? planGroupData[0]:null}
                  usersCount={usersCount}
                  usersCountLoading={usersCountLoading}
                />
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
    planGroupData, planGroupLoading,
    usersCount, usersCountLoading,
  } = state.businessEntities
  const {userData, userDataLoading} = state.generalEntities
  return {
    userDataLoading, userData,
    planGroupData, planGroupLoading,
    usersCount, usersCountLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadPlans, showMessage,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetailsPage)
