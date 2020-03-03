import React, { Component } from 'react'
import Link from 'react-router/lib/Link'
import {isArrayOK} from '../../../utils/array'
import {language, ln, dir} from '../../../utils/language'
import {getNormalizedDigit, getNormedBytes, } from '../../../utils/normalize'
import {getPDate, } from '../../../utils/date'
import {getDoughnutData, } from '../../../utils/doughnut'
import Loading from '../general/Loading'
import {isPasswordStrong} from '../../../utils/password'
import sha1 from 'sha1'

class PasswordInput extends Component {
  constructor(props) {
    super(props)
    this.state = {input: false}
  }
  isValid() {
    console.log('isValid', this.refs);
    if (this.refs.input.value) {
      this.refs.inputDiv.classList.remove('has-error')
      return true
    } else {
      this.refs.inputDiv.classList.add('has-error')
      return false
    }
  }
  render() {
    const {input} = this.props
    return (
      <div className="form-group"
        ref="inputDiv">
        <label className="col-lg-3 col-md-4 col-sm-4 control-label">
          {ln(input)}
        </label>
        <div className="col-lg-9 col-md-8 col-sm-8">
          <span>
            <input className="form-control input-form en-for-fa"
               ref="input"
              type={this.state.input? `text` :`password`}
              onChange={e => this.isValid()}
            />
            <span className={`fa fa-eye eye ${!this.state.input && 'text-gray'}`}
              style={{right: 25}}
              onClick={() => {
                this.setState({input: !this.state.input})
              }}>
            </span>
          </span>
        </div>
      </div>
    )
  }
}

export default class UserPassword extends Component {
  render() {
    console.log('UserPassword props', this.props);
    const {
      messageText, messageType,
      changePasswordLoading, handlers
    } = this.props
    return (
      <div id="changePassword" className="tab-pane">
        <div className="box user-profile-box">
          <div className="box user-box-body">
            <div className="box-body" style={{display: ''}}>
              <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8">

                  <form role="form" className="form-horizontal">


                    <PasswordInput ref="currentPassword" input="currentPassword" />
                    <PasswordInput ref="newPassword" input="newPassword" />



                    <div className="form-group">
                      <label className="col-lg-3 col-md-2 col-sm-4 control-label">

                      </label>
                      <div className="col-lg-9 col-md-10 col-sm-8">
                        <button type="button" id="submitButton" className="btn btn-primary"
                          disabled={changePasswordLoading}
                          onClick={() => {
                            if (!changePasswordLoading
                              && this.refs.currentPassword.isValid()
                              && this.refs.newPassword.isValid()
                            ) {
                              if (!isPasswordStrong(this.refs.newPassword.refs.input.value)) {
                                handlers.showMessage(ln('passwordIsNotStrong'))
                              } else {
                                handlers.changePassword(
                                  sha1(this.refs.currentPassword.refs.input.value),
                                  sha1(this.refs.newPassword.refs.input.value),
                                )
                              }
                            }

                            // let isValidated = isValid(this.refs, field.name)
                          }}>{ln('changePassword')} &nbsp;
                          {changePasswordLoading?
                            <i className="fa fa-spin fa-circle-o-notch"></i>
                            :
                            <i className="fa fa-key" />
                          }
                        </button>
                      </div>
                    </div>


                  </form>

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }
}
