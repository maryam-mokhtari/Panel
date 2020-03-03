import React, { Component } from 'react'
import {language, ln, dir} from '../../../utils/language'

export default class Message extends Component {

  render() {
    console.log('message props', this.props);
    let { message } = this.props
    if (!message || message == {}) {
      return <div />
    }

    setTimeout(
      () => {
      if (this.refs.messageDiv) {
        message = []
        this.props.handlers.clearMessage()
      }
    }
    , 7400)
    return (
      <div className="box" id="message-div" ref="messageDiv" style={{display: 'block', [dir('reverseAlign')]: 15}}>
        <div className={`box-header bg-${message.color}`} style={{direction: dir('direction')}}>
          {ln(message.messageText)}

          <div className={`box-tools pull-${dir('reverseAlign')}`}>
            <button type="button" className="btn btn-box-tool" data-widget="remove">
              <i className="fa fa-times text-gray"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
