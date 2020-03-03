import React from 'react'

// Componnets
import {language, ln, dir, swip} from '../../../utils/language'
import {getNormalizedDigit} from '../../../utils/normalize'
import {getPersianDate} from '../../../utils/date'
import {isUserInRole, ADMIN} from '../../../utils/role'
import {siteConfig} from '../../../utils/siteConfig'
import {isArrayOK} from '../../../utils/array'
import Grid from './Grid'

// Utils
import { extractDiscountObjectFromInvoicePrices, extractPriceObjectFromInvoicePrices, extractTaxObjectFromInvoicePrices, poogieToRials } from '../../../utils/business/price'

// import invoiceCss from '../../../../design/dist/css/styles/invoice.css'
import { getProvinceName } from '../../../utils/cities'

// Table Cell width generator (total: 11 cells)
const tableCellWidthGenerator = span => `${(span / 11) * 100}%`

// Top row
const TopRow = props => {





  const { isPreInvoice, customerType, displayName, company, businessCode, nationalId, registerNo } = props

  return (
    <tr>
      <td colSpan={3} style={{ width: tableCellWidthGenerator(3) }}>
        {ln('companyName')}: {customerType === 'individual' ? displayName : company}
      </td>
      <td colSpan={4} style={{ width: tableCellWidthGenerator(4) }}>
        {ln('businessCode')}: <Grid value={businessCode} fixedNumber={12} isPreInvoice={isPreInvoice} />
      </td>
      <td colSpan={4} style={{ width: tableCellWidthGenerator(4) }}>
        {ln('registerNo')}/{ln('companyNationalCode')}:
        <Grid value={customerType === 'individual' ? nationalId : registerNo} fixedNumber={14} isPreInvoice={isPreInvoice} />
      </td>
    </tr>
  )
}

// Middle Row
const MiddleRow = props => {

  const { isPreInvoice, province, postalCode, city } = props

  return (
    <tr>
      <td colSpan={3} style={{ width: tableCellWidthGenerator(3) }}>
        {ln('fullAddress')}: {ln('province')}: {province} &nbsp;&nbsp;&nbsp;
      </td>
      <td colSpan={4} style={{ width: tableCellWidthGenerator(4) }}>
      {ln('postalCode')}: <Grid value={postalCode} fixedNumber={10} isPreInvoice={isPreInvoice} />
      </td>
      <td colSpan={4} style={{ width: tableCellWidthGenerator(4) }}>
        {ln('city')}: {city}
      </td>
    </tr>
  )
}

// Bottom Row
const BottomRow = props => {

  const { address, fax, phone, className } = props

  return (
    <tr>
      <td colSpan={7} style={{ width: tableCellWidthGenerator(7) }} className={className}>
        {ln('address')}: {address}
      </td>
      <td colSpan={4} style={{ width: tableCellWidthGenerator(4) }} className={className}>

        {ln('phone')}/{ln('fax')}: &nbsp;
        {fax}
        /
        {phone}
      </td>
    </tr>
  )
}

// irancellInvoiceConfig
const Config = {
  mtn: {
    logo:`/vm-admin-panel/design/dist/img/irancell-logo-${language.key}.jpg`,
    customerType: 'business',
    company: ln('irancellCompany'),
    businessCode: 411111631431,
    registerNo: 252949,
    province: ln('tehran'),
    city: ln('tehran'),
    address: ln('irancellAddress'),
    fax: 26311222,
    phone: 2319,
    postalCode: 1665973561,
    type: 'privatelyHeld',
  },
  pg: {
    logo: '/vm-admin-panel/design/dist/img/pg.png',
    customerType: 'business',
    company: ln('persiangigCompany'),
    businessCode: 411515138433,
    registerNo: 489099,
    companyNationalCode: 14005707415,
    province: ln('tehran'),
    city: ln('tehran'),
    address: ln('persiangigAddress'),
    phone: 66044118,
    postalCode: 1455633953,
    type: 'limitedResponsibility',
  }
}


class BusinessInvoice extends React.Component {

  // state = {
  //   invoiceRequested: false,
  // }

  // componentDidMount() {
    // this.props.getPaymentBank()
  // }

  // componentWillReceiveProps(nextProps) {
    // Updtae invoiceRequested
    // if (nextProps.invoice && !this.state.invoiceRequested) {
    //   // Update internal state
    //   this.setState({ invoiceRequested: true })
    //   // assignPayIdentifier only on un-paid invocice
    //   nextProps.isPreInvoice && !nextProps.invoice.paid && nextProps.assignPayIdentifier(nextProps.invoice.id)
    // }

  // }

  render() {

    const { userData, userDataLoading, invoiceLoading, invoiceDetailLoading, paymentBank, user,  } = this.props

    console.log('BusinessInvoice props:', this.props)
    const isSuperAdmin = isUserInRole(ADMIN.admincfs, userData)
    const isGroupAdmin = isUserInRole(ADMIN.groupadmin, userData)
    const companyConfig = Config[siteConfig.key]
    let invoice = this.props.invoice
    if (!invoice || isSuperAdmin && !user) return null
    if (Array.isArray(invoice)) {
      invoice = invoice[0]
    }
    const isPreInvoice = !invoice.paid

    let {
      customerType, displayName = '-', company = '-', businessCode, nationalId, registerNo,
      province = '-', postalCode, city = '-',
      address = '-', fax = '-', phone = '-'
    } = isGroupAdmin? userData.profile : isArrayOK(user) && user[0].profile?user[0].profile:{}
    console.log('invoice is', invoice);
    const { paid, product, dueDate, totalPrice, refCode, recurringPeriod, invoiceStatus, id, invoiceItems, payIdentifier, } = invoice
    const pujiToRial = 10000
    const { name, priceInfo, jsonInfo, featureInfo } = product
    const description = featureInfo? JSON.parse(featureInfo)[language.key+'_description'] : ''

    const price = extractPriceObjectFromInvoicePrices(invoiceItems).price
    const discount = extractDiscountObjectFromInvoicePrices(invoiceItems).price
    const tax = extractTaxObjectFromInvoicePrices(invoiceItems).price
    const priceWithDiscount = price - discount
    const priceWithDiscountAndTax = priceWithDiscount + tax

    return (
      <div className="invoice-main-div">
        <table className="table table--invoice table--center">
          <tbody>
            <tr>
              <td colSpan={2} className={`no-border text-${dir('align')}`} style={{ width: tableCellWidthGenerator(3) }} >
                <img src={companyConfig.logo} style={{width: 100}} />
              </td>
              <td colSpan={5} className="no-border" style={{ width: tableCellWidthGenerator(5) }}>

                  {ln(companyConfig.company)}
                   (
                     {ln(companyConfig.type)}
                   )
                  <br /><br />
                  <strong>
                    {swip(isPreInvoice? 'preInvoice': 'invoice', 'sellingGoodsAndServices')}
                  </strong>

              </td>
              <td colSpan={4} className="no-border" style={{ width: tableCellWidthGenerator(3) }}>
                <span className="label">
                  <span className="label__text">{ln('serialNo')}</span>
                  <span className="label__input">
                    {
                      isPreInvoice ?
                        invoice.preInvoiceSerial:
                        invoice.serial
                    }
                  </span>
                </span>

                <span className="label">
                  <span className="label__text">{ln('orderNo')}</span>
                  <span className="label__input">
                  </span>
                </span>

                <span className="label">
                  <span className="label__text">{ln('invoiceDate')}</span>
                  <span className="label__input">
                    {getPersianDate(new Date())}
                  </span>
                </span>
                <span className="label">
                  <span className="label__text">{ln('dueDate')}</span>
                  <span className="label__input">
                    {isPreInvoice? getPersianDate(dueDate):''}
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ border: '1px solid #333', marginBottom: 20 }}>
          <table className="table table--invoice" style={{ marginBottom: 0 }}>

            <tbody>
              <tr>
                <td colSpan="11" className="td-title">{ln('dealerInformation')}</td>
              </tr>

              <TopRow
                customerType={companyConfig.customerType}
                businessCode={companyConfig.businessCode}
                nationalId={companyConfig.nationalId}
                registerNo={companyConfig.registerNo}
                company={companyConfig.company}
                isPreInvoice={isPreInvoice}
              />
              <MiddleRow
                province={companyConfig.province}
                postalCode={companyConfig.postalCode}
                city={companyConfig.city}
                isPreInvoice={isPreInvoice}
              />
              <BottomRow
                address={companyConfig.address}
                fax={companyConfig.fax}
                phone={companyConfig.phone}
                className="has-border--bottom"
              />
                <tr>
                  <td colSpan="11" className="td-title">{ln('customerInformation')}</td>
                </tr>

              <TopRow
                customerType={customerType}
                businessCode={businessCode}
                nationalId={nationalId}
                registerNo={registerNo}
                company={company}
                isPreInvoice={isPreInvoice}
              />
              <MiddleRow
                province={getProvinceName(province)}
                postalCode={postalCode}
                city={city}
                isPreInvoice={isPreInvoice}
              />
              <BottomRow
                address={address}
                fax={fax}
                phone={phone}
                className="has-border--bottom"
              />
            </tbody>
            <tbody>
              <tr>
                <td colSpan={11} className="td-title">{ln('dealItemInformation')}</td>
              </tr>

              {/* Invoice */}
              <tr className="has-border--bottom">
                <td className={`is--bordered-${language.key}`}>{ln('number')}</td>
                <td className={`is--bordered-${language.key}`}>{ln('productCode')}</td>
                <td className={`is--bordered-${language.key}`}>{ln('itemOrServiceDescription')}</td>
                <td className={`is--bordered-${language.key}`}>{ln('count')} / {ln('amount')}</td>
                <td className={`is--bordered-${language.key}`}>{ln('unitOfMeasurement')}</td>
                <td className={`is--bordered-${language.key}`}>{ln('unitPrice')} ({ln('irr')})</td>
                <td className={`is--bordered-${language.key}`}>{ln('totalPrice')} ({ln('irr')})</td>
                <td className={`is--bordered-${language.key}`}>{ln('discountPrice')} ({ln('irr')})</td>
                <td className={`is--bordered-${language.key}`}>{ln('totalPriceAfterDiscount')} ({ln('irr')})</td>
                <td className={`is--bordered-${language.key}`}>{ln('tax')} ({ln('irr')})</td>
                <td className="is--bordered">{ln('totalPricePlusTax')} ({ln('irr')})</td>
              </tr>
              {/* Price */}
              <tr className="has-border--bottom">
                <td className={`is--bordered-${language.key}`}>1</td>
                <td className={`is--bordered-${language.key}`}>{name}</td>
                <td className={`is--bordered-${language.key}`}>{description}</td>
                <td className={`is--bordered-${language.key}`}>1</td>
                <td className={`is--bordered-${language.key}`}>{ln('user')}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(price ,true)}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(price ,true)}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(discount ,true)}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(priceWithDiscount ,true)}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(tax ,true)}</td>
                <td className="is--bordered">{getNormalizedDigit(priceWithDiscountAndTax ,true)}</td>
              </tr>

              <tr className="has-border--bottom">
                <td colSpan="6" className={`is--bordered-${language.key} text-center`}>{ln('totalPrice')}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(price ,true)}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(discount ,true)}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(priceWithDiscount ,true)}</td>
                <td className={`is--bordered-${language.key}`}>{getNormalizedDigit(tax ,true)}</td>
                <td className="is--bordered">{getNormalizedDigit(priceWithDiscountAndTax ,true)}</td>
              </tr>
              <tr className="has-border--bottom">
                <td className={`is--bordered-${language.key} text-center`} colSpan={6} style={{ width: tableCellWidthGenerator(6), position: 'relative' }}>
                  <span style={{ position: 'absolute', [dir('align')]: 8, top: 20 }}>{ln('saleTermsAndConditions')}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  {ln('cash')}:
                  <span className="square">

                  </span>

                  &nbsp;&nbsp;&nbsp;
                  {ln('nonCash')}:
                  <span className="square">

                  </span>
                  &nbsp;&nbsp;&nbsp;
                </td>
                <td colSpan={3} style={{ width: tableCellWidthGenerator(3) }} className={`is--bordered-${language.key}`}>
                  {ln('payIdentifier')}:
                  {
                    invoiceDetailLoading? <i className="fa fa-spinner fa-spin" /> : payIdentifier
                  }
                </td>
                <td colSpan={3} style={{ width: tableCellWidthGenerator(2) }} className="is--bordered">
                  {ln('productId')}:
                </td>
              </tr>
              <tr className="has-border--bottom">
                <td colSpan={11} className="is--bordered">
                  {ln('saleDescription')}:&nbsp;&nbsp;&nbsp;
                  {isPreInvoice &&
                    (invoiceDetailLoading? <i className="fa fa-spinner fa-spin" /> : paymentBank)
                  }
                </td>
              </tr>
              <tr>
                <td className={`is--bordered-${language.key}`} colSpan={6} style={{ width: tableCellWidthGenerator(6), borderBottom: 0 }}>
                  {ln('dealerStampAndSignature')}
                  {siteConfig.key != 'pg' &&
                    <img src={`/vm-admin-panel/design/dist/img/${siteConfig.key}/stamp.png`} style={{
                      position: 'relative',
                      [dir('reverseAlign')]: -100,
                      width: 120,
                    }} />
                  } 
                </td>
                <td className="is--borderd" colSpan={5} style={{ width: tableCellWidthGenerator(5) }}>
                  {ln('customerStampAndSignature')}
                </td>
              </tr>
            </tbody>

          </table>

        </div>
        {isPreInvoice &&
          <div >
            <p className="pre-Invoice-bottom-notify">
              {ln('note')}:&nbsp;
              {ln('invoiceNoteDescription')}
              .
            </p>

          </div>
        }

      </div>
    )
  }
}

export default BusinessInvoice
