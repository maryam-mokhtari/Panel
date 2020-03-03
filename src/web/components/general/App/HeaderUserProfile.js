import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import { baseRoute } from '../../../../utils/route'
import { language, ln, dir } from '../../../../utils/language'
import { siteConfig } from '../../../../utils/siteConfig'

import profileImage from '../../../../../design/dist/img/mtn/profileImage.png'

export default class AppHeaderUserProfile extends Component {
  render() {
    const { userDataLoading, userData, } = this.props
    console.log('header location.pathname is: ', location.pathname, userData);
    return (
      <li className="dropdown user user-menu">
        {userDataLoading == false ?
          userData ?
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" 
            style={siteConfig.key == 'mtn' ? { color: 'black', fontWeight: 'bold', padding: '2px 0px 0px 0px', height: '50px', textAlign: 'center' } : {}}>
              {/*<img src={`https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`} className="user-image" alt="User Image" />*/}
              {/*<img src={profileImage} className="user-image" alt="User Image" />*/}

              {/*<span style={{ lineHeight: '15px' }} className="hidden-xs en-font">{userData.username}</span>*/}
              {/*&nbsp;*/}
              <ul className="header-user-menu" style={{ listStyleType: 'none', display: 'flex' }}>
                <li>
                  <ul style={{ listStyleType: 'none' }}>
                    <li style={{ borderBottom: '2px solid #444' }}>
                      {userData.profile.company}
                    </li>
                    <li>
                      {userData.username}
                    </li>
                  </ul>
                </li>
                <li>
                  {/*<img src={profileImage} className="user-image header-user-image" alt="User Image" />*/}
                  <img src={`https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`} className="user-image header-user-image irancell-user-img" alt="User Image" />
                </li>
              </ul>
              {/*<i className="fa fa-chevron-circle-down" /> */}
            </a>
            :
            <i />
          :
          <i className="fa fa-spin fa-circle-o-notch" style={{ marginRight: 60, marginTop: 17, color: 'white' }} />
        }
        <ul className="dropdown-menu">
          <li className="user-header">

            <img src={userData && `https://www.gravatar.com/avatar/${userData.md5}?d=blank&s=0`}
              className="img-circle irancell-user-img" alt="User Image" />

            <p style={{ marginTop: 5 }}>
              <span className="en-font">{userData && userData.displayName}</span> -  Admin
              {userData && userData.lastPaidInvoice &&
                <small>
                  {ln('membersince')}
                  &nbsp;
                  <span className="en-font">
                    {
                      new Date(userData.createdAt).toString().split(' ')[1] + '. '
                      + new Date(userData.createdAt).toString().split(' ')[3]
                    }
                  </span>
                </small>
              }
              <small className="en-for-fa">{userData && userData.email}</small>
            </p>
          </li>

          <li className="user-footer">
            <div className={`pull-${dir('align')}`}>
              <Link to={`/${baseRoute.active}/user/`} className="btn btn-default btn-flat">
                {ln('profile')}
              </Link>
            </div>
            <div className={`pull-${dir('reverseAlign')}`}>
              <a href={`/auth/signout${location.pathname}`} className="btn btn-default btn-flat">{ln('signout')}</a>
            </div>
          </li>
        </ul>
      </li>
    )
  }
}
