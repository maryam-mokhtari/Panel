import React, { Component } from 'react'
import { push } from 'react-router-redux'
import Link from 'react-router/lib/Link'
import { getNormalizedDigit, } from '../../../../utils/normalize'
import { baseRoute } from '../../../../utils/route'
import { getPDate } from '../../../../utils/date'
import { language, ln, dir } from '../../../../utils/language'
import { clearFormGeneratorModal, } from '../../../../utils/form'
import FormGeneratorModal from '../../general/FormGeneratorModal'
import ProgressBar from '../../general/ProgressBar'

export default class TrGroupUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeQuotaInput: false
    }
  }
  render() {
    const { item, pageNumber, pageSize, index, dispatch, trHandlers, trLoadings, isUser, } = this.props
    const { resendInvitation, deleteUser, loginAsClient, changeUserQuota, activateUser, deactivateUser, } = trHandlers
    const { resendLoading, deleteUserLoading, loginAsClientLoading, changeUserQuotaLoading, activateUserLoading, deactivateUserLoading, } = trLoadings
    const userGroup = item
    const { email, quota, active, user, id } = userGroup
    const userQuota = user && user.quota || 0
    console.log('TrGroupUser props', this.props, user, id);
    return (
      <tr role="row">
        <td data-title={ln('number')}>
          {pageNumber && pageSize ? (pageNumber - 1) * pageSize + index + 1 : index + 1}
        </td>
        <td data-title={ln('email')} className="en-font">
          {email}
        </td>
        <td data-title={ln('quota')}>
          <ProgressBar usedQuota={userQuota} baseQuota={quota} />
        </td>
        <td data-title={ln('active')}>{active ? <i className="fa fa-check text-green" /> : <i className="fa fa-times text-red" />}</td>
        <td data-title={ln('registered')}>{user ? <i className="fa fa-check text-green" /> : <i className="fa fa-times text-red" />}</td>
        {user ?
          <td data-title={ln('settings')}>
            {isUser &&
              <button className="users-space btn btn-primary"
                onClick={() => {
                  this.setState({ showChangeQuotaInput: !this.state.showChangeQuotaInput });
                }}
              >
                {ln('changeUserQuota')} &nbsp;
                {changeUserQuotaLoading == user.id ?
                <i className="fa fa-pencil-square-o" />
                  :
                  <i className="fa fa-pencil-square-o" />
                }
              </button>
            }
            {/*<button className="users-space btn btn-primary"
              disabled={changeUserQuotaLoading == user.id || !active}
              data-toggle="modal"
              data-target={!changeUserQuotaLoading && `.changeUserQuota${id}`}
            >*/}
            {this.state.showChangeQuotaInput &&
              <button className="users-space btn btn-primary"
                disabled={changeUserQuotaLoading == user.id || !active}
                onClick={() => {
                  changeUserQuota(user.id, this.refs['changeQuotaRef'].value)
                }}
              >
                {ln('confirm')} &nbsp;
                {changeUserQuotaLoading == user.id ?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  ""
                }
              </button>
            }
            {this.state.showChangeQuotaInput &&
              <input type="number" ref="changeQuotaRef" placeholder="حجم کاربر را وارد کنید..."
              defaultValue={Math.round(quota * 100000 / (1024 * 1024 * 1024)) / 100000 } // round by 5 digits
               />
            }

            {!this.state.showChangeQuotaInput &&
              <button className="users-space btn btn-default"
                disabled={loginAsClientLoading == user.username || !active}
                onClick={() => !loginAsClientLoading && loginAsClient(user.username)}>
                {ln('enterUserAccount')} &nbsp;
              {loginAsClientLoading == user.username ?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  <i className="fa fa-sign-in" />
                }
              </button>
            }
            {active ?
              !this.state.showChangeQuotaInput && isUser &&
              <button className="users-space btn btn-danger"
                disabled={deactivateUserLoading == user.id}
                onClick={() => !deactivateUserLoading && deactivateUser(user.id)}>
                {ln('deactivate')} &nbsp;
                  {deactivateUserLoading == user.id ?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  <i className="fa fa-eye-slash" />
                }
              </button>
              :
              !this.state.showChangeQuotaInput && isUser &&
              <button className="users-space btn btn-success"
                disabled={activateUserLoading == user.id}
                onClick={() => !activateUserLoading && activateUser(user.id)}>
                {ln('activate')} &nbsp;
                  {activateUserLoading == user.id ?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  <i className="fa fa-eye" />
                }
              </button>
            }
          </td>
          :
          !this.state.showChangeQuotaInput && isUser ?
            <td data-title={ln('settings')}>
              <button className="users-space btn btn-primary"
                disabled={resendLoading == id}
                onClick={() => !resendLoading && resendInvitation(id, language.key)}>
                {ln('resendEmailInvitation')} &nbsp;
                {resendLoading == id ?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  <i className="fa fa-share-square-o" />
                }
              </button>
              <button className="users-space btn btn-danger"
                disabled={deleteUserLoading == id}
                onClick={() => !deleteUserLoading && deleteUser(id)}>
                {ln('deleteUser')} &nbsp;
                {deleteUserLoading == id ?
                  <i className="fa fa-spin fa-circle-o-notch" />
                  :
                  <i className="fa fa-close" />
                }
              </button>
            </td>
            :
            <td data-title={ln('settings')}>
              &nbsp;
            </td>
        }
      </tr>

    )
  }
}
