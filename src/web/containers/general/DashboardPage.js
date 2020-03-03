import React, { Component } from 'react'
import {language, ln, dir} from '../../../utils/language'
import {baseRoute} from '../../../utils/route'
import Loading from '../../components/general/Loading'
import DashboardBox from '../../components/general/DashboardBox'
import { isUserInRole, getUserRole, ADMIN, } from '../../../utils/role'
import { siteConfig, } from '../../../utils/siteConfig'
import { connect } from 'react-redux'

class DashboardPage extends Component {
  render() {
    const { userData, userDataLoading, billingData, } = this.props
    // const noInvoicePaid = !userData || !userData.plan || !userData.plan.jsonInfo || JSON.parse(userData.plan.jsonInfo).type != 'business'
    const noInvoicePaid = !userData || !userData.lastPaidInvoice || userData.lastPaidInvoice.invoiceStatus != 'PAID'
    const isCadminNotAllowed = userData && userData.groups.length == 1
      && userData.groups[0].name == 'user_group'
    return userDataLoading?
      <Loading />
      :
      isCadminNotAllowed? <div style={{padding: 50}}>{ln('noaccess')}.</div>: (
      <div>
        <section className="content-header">
          <h1>
            {ln('dashboard')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>
          <ol className="breadcrumb">
            <li className="active">{ln('home')}</li>
            <li className="active">{ln('dashboard')}</li>
          </ol>
        </section>

        <section className="content">
          {baseRoute.isMaster?
            <div>
              {isUserInRole(ADMIN.admincws, this.props.userData) &&
                <div className="row">
                  <DashboardBox title="vmbills" icon="shopping-basket" color="teal" />
                  <DashboardBox title="vminvoices" icon="file-text-o" color="light-blue" />
                  <DashboardBox title="ips" icon="globe" color="olive" />
                  <DashboardBox title="hyps" icon="server" color="purple" />
                </div>
              }
              {isUserInRole(ADMIN.admincfs, this.props.userData) &&
                <div className="row">
                  <DashboardBox title="users" icon="users" color="aqua" />
                  <DashboardBox title="groups" icon="user-circle-o" color="green" />
                  <DashboardBox title="plans" icon="ge" color="yellow" />
                  <DashboardBox title="invoices" icon="file-text-o" color="red" />
                  <DashboardBox title="charts" icon="area-chart" color="blue" />
                </div>
              }
              {isUserInRole(ADMIN.authorization, this.props.userData) &&
                <div className="row">
                  <DashboardBox title="users" icon="users" color="aqua" />
                </div>
              }
              {isUserInRole(ADMIN.invoice, this.props.userData) &&
                <div className="row">
                  <DashboardBox title="invoices" icon="file-text-o" color="red" />
                </div>
              }
            </div>
            :
              baseRoute.isBusiness && !noInvoicePaid?
              <div className="row">
                <DashboardBox title="users" icon="users" color="aqua" />
                <DashboardBox title="plan" icon="ge" color="green" />
                <DashboardBox title="invoices" icon="file-text-o" color="red" />
                <DashboardBox title="charts" icon="area-chart" color="blue" />
                <DashboardBox title="newUser" icon="user-o" color="orange" />
                <DashboardBox title="planInfo" icon="life-ring" color="teal" />
                <DashboardBox title="about" icon="info" color="light-blue" />
                  <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-olive">
                      <div className="inner">
                        <h3>&nbsp;</h3>
                        <p>
                          <a href="/fm/cfs/" target="_blank" className="white-link bigger-font">
                            {ln('cfs')}
                          </a>
                        </p>
                      </div>
                      <div className="icon">
                        <a href="/fm/cfs/" target="_blank" className="icon-link">
                          <i className="fa fa-cloud-download"></i>
                        </a>
                      </div>
                      <a href="/fm/cfs/" target="_blank" className="small-box-footer">
                        {ln('moreinfo')} <i className={`fa fa-arrow-circle-${dir('reverseAlign')}`}></i>
                    </a>
                    </div>
                  </div>
              </div>
              :
              <div/>
          }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {userData, userDataLoading} = state.generalEntities
  const {billingData} = state.businessEntities
  // const pathname = ownProps.location.pathname

  return {
    userData, userDataLoading, billingData,
    // pathname,
  }
}


export default connect(mapStateToProps)(DashboardPage)
