import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'react-router/lib/Link'
import {push} from 'react-router-redux'
import {isArrayOK} from '../../../utils/array'
import {isValid, clear} from '../../../utils/form'
import { inviteUsers, showMessage, } from '../../../actions'
import { baseRoute } from '../../../utils/route'
import { siteConfig, } from '../../../utils/siteConfig'
import { extractEmails } from '../../../utils/email'
import { language, ln, dir } from '../../../utils/language'

class NewUserPage extends Component {
  async sendInvitation() {
    const {inviteUserLoading, dispatch, inviteUsers} = this.props
    console.log('sendInvitation props', this.props)
    if (!inviteUserLoading && isValid(this.refs, 'quota') & isValid(this.refs, 'emails')) {
      this.checkCSV()

      let extractedEmails = extractEmails(this.refs.emails.value)

      if (!this.isEmailsValid(extractedEmails)) {
        this.props.showMessage(ln('emailFormatNotValid'))
        return
      }
      if (!this.isNumberMoreThanZero(this.refs.quota.value)) {
        this.props.showMessage(ln('quotaIsInvalid'))
        return
      }
      await inviteUsers(extractedEmails, Math.round(Number(this.refs.quota.value) * 1024 * 1024 * 1024), language.key)

      if (this.props.inviteUserSuccess) {
        dispatch(push(`/${baseRoute.business}/users`))
      }
    }
  }
  isEmailsValid(emails) {
    return emails.split(',').every(item => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(item)) {
        return true
      } else if (parseInt(item) > 0) {
        return true
      }
    })
    return false
  }
  isNumberMoreThanZero(number) {
    if (!isNaN(number) && parseInt(number) > 0) {
      return true
    }
    return false
  }
  checkCSV() {
    if (this.refs.csvFile && this.refs.csvFile.files && this.refs.csvFile.files.length) {
      const csvFile = this.refs.csvFile.files[0]
      const postfix = csvFile.name.split('.').pop().toLowerCase()
      if (postfix != 'csv') {
        this.props.showMessage(ln('fileFormatNotValid'))
        return
      }
      const reader = new FileReader()
      reader.onload = function() {
        document.getElementById('emails').value = reader.result
      }
      reader.readAsText(csvFile)
    }

  }
  componentDidMount() {
    document.getElementsByTagName('body')[0].classList.remove('sidebar-collapse')
  }
  render() {
    const { messageText, messageType, clearMessage, emails, inviteUserLoading,
      dispatch, erronousEmails,
    } = this.props
    const handlers = { clearMessage, }

    const showLanguage = language.key == 'fa' ? 'EN' : 'FA'
    const isfa = language.key == 'fa'
    console.log('NewUserPage props', this.props);
    return (
      <div>
        <section className="content-header" >

          <h1>
            {ln('userInvitation')}
            {siteConfig.key != 'mtn' &&
              <small>{ln('controlPanel')}</small>
            }
          </h1>

          <ol className="breadcrumb">
            <li>
              <Link to={`/${baseRoute.business}`}>{ln('home')}</Link>
            </li>
            <li className="active">{ln('userInvitation')}</li>
          </ol>

        </section>

        <section className="content">

          <div className="box-body">

            <div className="col-md-6 newuserpage">

              <div className="row vertical-margin">

                <div className="col-lg-6 vertical-margin">
                  {ln('Initialvolumeforallusers')}:
                </div>

                <div className="col-lg-6" ref="quotaDiv">

                  <input type="number" min="1" className="form-control"

                    style={{fontFamily: 'tahoma', backgroundColor: 'transparent', width: '70%',
                            borderTop: 0, borderLeft: 0, borderRight: 0, borderBottom:'2px solid', float: 'left'}}

                    ref="quota"
                    id="quota"
                    tabIndex="1"
                    onChange={() => isValid(this.refs, 'quota')}
                    placeholder={ln('gb')}/>
                  <span ref="quotaErrorIcon" className="fa fa-close  form-control-feedback hide" style={{marginLeft: 10}}></span>

                </div>

              </div>

              <div className="vertical-margin" ref="emailsDiv">

              <div style={{fontSize: '19px'}}>
                 {ln('Enteremailaddress')}:
              </div>

                <textarea name="" id="" cols="30" rows="7"
                  style={{ direction: dir('direction'), fontFamily: 'tahoma', borderRadius: '10px'}}

                  className="form-control en-font" dir="auto"
                  ref="emails"
                  id="emails"
                  tabIndex="2"
                  placeholder={ln('emailsTextArePlaceholder')}
                  onChange={() => isValid(this.refs, 'emails')}
                  ></textarea>
                <span ref="emailsErrorIcon" className="fa fa-close  form-control-feedback hide emails-errors"></span>
              </div>

              <div className="vertical-margin"

                style={{direction: dir('direction'), paddingTop: '10px'}}>

                <span style={{fontSize: '14', fontWeight: 'bold'}}>
                  {ln('addcsvfilehere')}
                </span>
                
                <span className="file-reader">
                  
                  <span className="file-reader__trigger">
                    <input type="file" id="csv" className="file-reader__input" ref="csvFile"
                      onChange={() => this.checkCSV()}
                      />
                    <button type="button" className="file-reader__button"
                      tabIndex="4"
                      >
                      {ln('selectFile')}
                    </button>
                  </span>
                  <span className="" style={{ padding: '0 10px 0 10px', fontSize: '9px' }}>{ln('enterCSVFile')}</span>
                </span>
                {isArrayOK(erronousEmails) &&
                  <div className="erronous-emails">
                    <p>{ln('repetitiveEmails')}:</p>
                    {erronousEmails.map((email, index) => <div key={index} className={`en-for-fa text-${dir('align')}`}>{email}</div>)}
                  </div>
                }
              </div>

              <div className="vertical-margin">
                <button className="btn-mtn"

                  style={{display: 'flex' , margin: 'auto',
                          alignItems: 'center', justifyContent: 'center'}}

                  disabled={inviteUserLoading}
                  tabIndex="3"
                  onClick={() => this.sendInvitation()}>
                  {ln('sendInvitationEmail')}
                  &nbsp;
                  {inviteUserLoading?
                    <i className="fa fa-spin fa-circle-o-notch"></i>
                    :
                    <img src="/vm-admin-panel/design/dist/img/mtn/send-mail.png" style={{height:'48'}}/>
                  }
                </button>
              </div>
            </div>


{/* Left Side */}

            <div className={`col-md-6 newuserpage ${language.key != 'en' ?'left-side':''}`} style={{background: '#c4c3c9', minHeight: '100vh' , padding: '20px 3%' , textAlign: 'justify'}}>

              <div style={{textAlign: 'justify'}}>

                <img src="/vm-admin-panel/design/dist/img/mtn/question.png" style={{height:'80' , display: 'flex', margin: 'auto'}}/>

{/* Content */}
                <span style={{display: 'flex' , justifyContent: 'center' , fontSize: '20px'}}>
                  {ln('Howtoaddnewusers')}:
                </span>

              <br/>

                {ln('invitenewusersdocument')}&nbsp;

              </div>

              <br/>

{/* First Pattern */}

              <b>{ln('firstPattern')}</b>

              <div className="en-for-fa">
                <div>
                  example1@domain.com,<wbr/>example2@domain.com,...<wbr/>
                </div>
                <br/>
              </div>

{/* Secend Pattern */}

                  <b>{ln('secondPattern')}</b>

              <div className="en-for-fa">
                <div>
                  example1@domain.com<br/>
                  example2@domain.com<br/>
                  example3@domain.com<br/>
                  example4@domain.com<br/>
                </div>
                <br/>
              </div>

{/* Third Pattern */}

                <b>{ln('thirdPattern')}</b>

                <br/>
                <br/>

              <div>
                  <a style={{color:'blue' , textDecorationLine: 'underline'}} href="/images/mtn/example.csv">
                    {ln('sampleCsv')}
                  </a>
              </div>

                <br/>

                {ln('csvdescription')}

            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    emails, inviteUserLoading, inviteUserSuccess,
    planGroupData, erronousEmails,
  } = state.businessEntities
  const entities = baseRoute.isBusiness? state.businessEntities: state.masterEntities
  const { messageText, messageType } = entities
  return {
    emails, messageText, messageType, inviteUserLoading, inviteUserSuccess,
    planGroupData, erronousEmails,
  }

}

const mapDispatchToProps = (dispatch) => {
  return {dispatch, ...bindActionCreators({
    inviteUsers, showMessage,
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserPage)
