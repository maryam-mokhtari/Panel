import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import { loadSingleInvoice, loadInvoice, assignPayIdentifier, getPaymentBank, loadUser,
  payInvoice, rejectInvoicePayment,
 } from '../../../actions'
import {baseRoute} from '../../../utils/route'
import { siteConfig, } from '../../../utils/siteConfig'
import {isArrayOK} from '../../../utils/array'
import {isUserInRole, ADMIN} from '../../../utils/role'
import {language, ln, dir} from '../../../utils/language'
import {getNormalizedDigit, getNormedBytes, } from '../../../utils/normalize'
import Loading from '../../components/general/Loading'
import BusinessInvoice from '../../components/business/BusinessInvoice'
import InvoiceInfo from '../../components/business/InvoiceInfo'


class InvoicePage extends Component {
  async getInvoiceData() {
    const {loadUser, loadInvoice, loadSingleInvoice, getPaymentBank, params, assignPayIdentifier,
      payInvoiceLoading, rejectInvoicePaymentLoading,
    } = this.props
    const { invoiceId } = params
    await loadInvoice(invoiceId)
    await loadSingleInvoice(invoiceId)
    console.log('invoiceData', this.props.invoiceData, Array.isArray(this.props.invoiceData));
    if (Array.isArray(this.props.invoiceData)) {
      loadUser(this.props.invoiceData[0].user.id)
    }
    getPaymentBank()
    // this.props.assignPayIdentifier(invoiceId)
    document.getElementsByTagName('body')[0].classList.add('sidebar-collapse')
  }
  componentDidMount() {
    this.getInvoiceData()
  }
  render() {
    console.log('InvoicePage props', this.props);
    const isPreInvoice = !!this.props.params.preInvoice
    const {
      invoiceData, paymentBank, payIdentifier,
      // loadInvoice, assignPayIdentifier, getPaymentBank,
      invoiceLoading, invoiceDetailLoading,
      userData, userDataLoading, user, userLoading,
      cfsInvoiceLoading, invoiceRejectData, invoiceId, payInvoiceLoading,
      payInvoice, rejectInvoicePayment, rejectInvoicePaymentLoading,
     } = this.props

     const isProfileOK =
     !userData || userData.name && userData.family && userData.email && userData.terms
     && userData.mobileNumber
     && userData.profile
     && userData.profile.address
     &&  userData.profile.customerType && userData.profile.nationalId
     &&  userData.profile.phone && userData.profile.postalCode
     && userData.profile.province && userData.profile.city
     &&  (userData.profile.customerType != 'business'
       || userData.profile.registerNo &&  userData.profile.company
       && userData.profile.companyNationalCode
       )
    const invoice =  invoiceData && invoiceData.invoice ? invoiceData.invoice : invoiceData
    const businessInvoiceProps = {
      userData, userDataLoading, invoice, assignPayIdentifier, getPaymentBank,
      paymentBank, payIdentifier, invoiceLoading, invoiceDetailLoading,
      isPreInvoice, user,
      cfsInvoiceLoading, invoiceRejectData, invoiceId, payInvoiceLoading,
      payInvoice, rejectInvoicePayment, rejectInvoicePaymentLoading,
    }
    const isAdmin = isUserInRole(ADMIN.admincfs, userData) || isUserInRole(ADMIN.invoice, userData)
    const isNotReadOnly = isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData)
      || isUserInRole(ADMIN.invoice, userData)

     if (!isProfileOK  && !isAdmin) {
       location.href = "/auth/account/fill"
     }
    return (
      <div>
        <section className="content-header">
          <h1>
            {ln('invoice')}&nbsp;
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
            {(isUserInRole(ADMIN.groupadmin, userData) ||
              ((isUserInRole(ADMIN.admincfs, userData) || isUserInRole(ADMIN.invoice, userData)
            ) && !isPreInvoice)
             ) &&
              <button className="btn btn-primary" style={{ marginLeft: 25, marginRight: 25 }} onClick={() => window.print()}>
                {ln('printSave')}&nbsp;
                {
                  isPreInvoice ? ln('preInvoice'): ln('invoice')
                }
              </button>
            }
            {(isUserInRole(ADMIN.admincfs, userData) && !isUserInRole(ADMIN.readonlysuperadmin, userData)
              || isUserInRole(ADMIN.invoice, userData)
            ) &&
              <InvoiceInfo
                 isNotReadOnly={isNotReadOnly}
                 handlers={{payInvoice:this.props.payInvoice, rejectInvoicePayment: this.props.rejectInvoicePayment}}
                 payInvoiceLoading={this.props.payInvoiceLoading}
                 rejectInvoicePaymentLoading={this.props.rejectInvoicePaymentLoading}
                 invoice={invoice} />
            }
          </h1>
          <ol className="breadcrumb">
            <li><Link to={`/${baseRoute.master}`}>{ln('home')}</Link></li>
            <li><Link to={`/${baseRoute.active}/invoices`}>{ln('invoices')}</Link></li>
            <li className="active">{ln('invoice')}</li>
          </ol>
        </section>
        {invoiceLoading || userDataLoading || userLoading?
          <Loading />
          :
          <section className="content" style={{direction: ln('direction')}}>
            <div className="row docs-premium-template">
              <div className="col-lg-12 invoice-overflowed">
                <BusinessInvoice {...businessInvoiceProps} />
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
    paymentBank, payIdentifier,
    invoiceLoading, invoiceDetailLoading,
  } = state.businessEntities
  const {
    cfsInvoiceLoading, invoiceRejectData, invoiceId, payInvoiceLoading,
    rejectInvoicePaymentLoading, user, userLoading,
  } = state.masterEntities
  const entities = baseRoute.isBusiness? state.businessEntities: state.masterEntities
  const {invoiceData} = entities
  const {userData, userDataLoading} = state.generalEntities
  return {
    invoiceData, paymentBank, payIdentifier,
    invoiceLoading, invoiceDetailLoading,
    userData, userDataLoading,
    user, userLoading,
    cfsInvoiceLoading, invoiceRejectData, invoiceId, payInvoiceLoading,
    rejectInvoicePaymentLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadSingleInvoice, loadInvoice, assignPayIdentifier, getPaymentBank,
    loadUser,
    payInvoice, rejectInvoicePayment,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage)
