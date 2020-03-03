import React, { Component } from 'react'
import UserInfo from './UserInfo'
import { getNormalizedDigit, } from '../../../utils/normalize'
import { capilizeString, } from '../../../utils/string'
import { cities, getProvinceName } from '../../../utils/cities'
import {UserType} from '../../../utils/user'
import {language, ln, dir, swip, } from '../../../utils/language'
import {isArrayOK} from '../../../utils/array'

export default class UserInformation extends Component {
  render() {
    // console.log('userInformation props : ', this.props)
    const { user, baseColor, userLoading, } = this.props
    return (
      <div id="about" className="tab-pane active">
        <div>
          {
            isArrayOK(user) &&
            <div className="user-profile-box">
              <div className="user-box col-lg-9 col-md-12">
                <div className="box-body user-box-body">
                  {user[0].profile && user[0].profile.customerType == 'business' &&
                    <div className="inner-box-body company-info">
                      <h3><i className="fa fa-university" aria-hidden="true"></i> &nbsp; {ln('companyInformation')}</h3>
                      <div className="row text-grey">
                        <UserInfo label="customerType" text={user[0].profile.customerType} textClass="text-blue" />
                        <UserInfo label="company" text={user[0].profile.company} />
                        <UserInfo label="companyNationalCode" text={user[0].profile.companyNationalCode} />
                        <UserInfo label="companyStaffCount"
                          text={ln('companyCount')[user[0].profile.companyStaffCount]}
                          condition={user[0].profile.companyStaffCount} />
                        <UserInfo label="businessCode" text={user[0].profile.businessCode} />
                        <UserInfo label="registerNo" text={user[0].profile.registerNo} />
                      </div>
                    </div>
                  }
                  <div className="inner-box-body">
                    <h3><i className="fa fa-user" aria-hidden="true"></i> &nbsp; {user[0].name} {user[0].family}</h3>
                    <div className="row text-grey" style={{ marginBottom: '10px' }}>

                      <UserInfo label="username" text={user[0].username} textClass={`en-for-fa-${dir('align')}`} />
                      <UserInfo label="email" text={user[0].email} textClass={`en-for-fa-${dir('align')}`} />
                      <UserInfo label="balance"
                        text={getNormalizedDigit(user[0].balance, true) + ' ' + ln('irr')}
                        condition={user[0].balance} />
                      <UserInfo label="group"
                        text={user[0].groups.map((grp, index) =>
                          UserType[grp.name]?
                          <span key={index} className={`text-${UserType[grp.name].color}`}>{UserType[grp.name][language.key]}
                            {index < user[0].groups.length - 1? language.key == 'fa'? '، ':', ':' '}
                          </span>
                          : <span key={index} className="text-grey">{grp.name}, </span>
                        )}
                        condition={user[0].groups}
                        textClass="text-green"
                         />
                      <UserInfo label="language"
                        condition={user[0].language && user[0].language.code && user[0].language.name}
                        text={user[0].language && user[0].language.code + '-' + user[0].language.name} />
                      <UserInfo label="mobile" text={user[0].mobileNumber} />
                      {/*<UserInfo label="mobileVerified" text={user[0].mobileVerified ?
                              <i className="fa fa-check text-green" />
                              :
                              <i className="fa fa-times text-red" />} />
                      <UserInfo label="verificationCode" text={user[0].verificationCode} />*/}
                      {user[0].profile &&
                        <span>
                          <UserInfo label="phone" text={user[0].profile.phone} />
                          <UserInfo label="fax" text={user[0].profile.fax} />
                          <UserInfo label="address" text={user[0].profile.address} />
                          <UserInfo label="city" text={user[0].profile.city} />
                          <UserInfo label="postalCode" text={user[0].profile.postalCode} />
                          <UserInfo label="province"
                            condition={user[0].profile.province}
                            text={user[0].profile.province ? getProvinceName(user[0].profile.province) : '-'} />
                          <UserInfo label="nationalId" text={user[0].profile.nationalId} />
                        </span>
                      }

                    </div>
                  </div>
                </div>

              </div>

              <div className={`col-lg-3 col-md-12 user-${dir('align')}-box`} >
                {user && <div className="box inner-height">
                  <div className="box user-profile-box"
                    style={{ marginBottom: 0, textAlign: 'center', width: '100%', height: '100%' }}>
                    <div style={{ padding: '15px 25px 25px' }}>
                      <div className="profile-sidebar">
                        <img className="img-thumbnail"
                          src={`https://www.gravatar.com/avatar/${user && user[0].md5}?d=blank&s=200`}
                          />
                        <div className={`row box-header user-box-header with-border
                          send-msg send-msg-${language.key} bg-${baseColor}`} >
                          <div className="col-xs-12">
                            <a style={{ color: 'white' }} href={`mailto:${user[0].email}`}>
                              <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp; {ln('sendMessage')}
                            </a>
                          </div>
                        </div>
                      </div>
                      {(user) &&
                        <div>
                          {(user[0].name && user[0].family) &&
                            <h3>{capilizeString(user[0].name)}  {capilizeString(user[0].family)}</h3>
                          }
                          {user[0].email && <h5 className="en-for-fa text-overflow">{user[0].email}</h5>}
                          {user[0].profile && user[0].profile.customerType &&
                            <div className="text-blue">{swip('user', user[0].profile.customerType)}</div>
                          }
                        </div>
                      }
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          }
        </div>

      </div>

    )
  }
}
